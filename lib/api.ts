import { readingTime } from "@/lib/readingTime";

// --- Fetching ---------------------------------------------------------------

/**
 * Every Contentful query goes through here, tagged "contentful" so one
 * revalidation call refreshes everything. Fails fast: a bad status or a real
 * GraphQL error throws with the cause in the message, instead of returning
 * half a response that crashes a page later.
 */
async function fetchGraphQL(query: string, preview = false): Promise<any> {
	const res = await fetch(
		`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${
					preview
						? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
						: process.env.CONTENTFUL_ACCESS_TOKEN
				}`,
			},
			body: JSON.stringify({ query }),
			next: { tags: ["contentful"] },
		},
	);

	if (!res.ok) {
		// Contentful answers invalid queries (an unknown field, say) with a 400
		// and the reason in the body, so surface it.
		const detail = await res
			.json()
			.then((body: any) =>
				(body?.errors ?? []).map((error: any) => error.message).join("; "),
			)
			.catch(() => "");
		throw new Error(
			`Contentful request failed: ${res.status} ${res.statusText}${detail ? ` (${detail})` : ""}`,
		);
	}

	const json = await res.json();
	if (json.errors?.length) {
		// A link to a missing or unpublished entry is data, not a bug: Contentful
		// still returns everything else.
		const fatal = json.errors.filter(
			(error: any) =>
				error?.extensions?.contentful?.code !== "UNRESOLVABLE_LINK",
		);
		if (fatal.length) {
			throw new Error(
				`Contentful GraphQL errors: ${fatal.map((error: any) => error.message).join("; ")}`,
			);
		}
		console.warn(
			`Contentful: ${json.errors.length} unresolvable link(s) in response`,
		);
	}
	return json;
}

// --- Posts ------------------------------------------------------------------

const POST_LIST_FIELDS = `
  slug
  title
  coverImage {
    url
  }
  date
  author {
    name
    picture {
      url
    }
  }
  excerpt
  content {
    json
  }
`;

const POST_FIELDS = `
  slug
  title
  coverImage {
    url
  }
  date
  author {
    name
    picture {
      url
    }
  }
  excerpt
  content {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`;

/**
 * Adds `readingMinutes`. List items drop the body afterwards: the list query
 * only fetches `content.json` so the word count can be computed here.
 */
function withReadingTime(post: any, keepContent: boolean) {
	if (!post) return post;
	const { content, ...rest } = post;
	return {
		...rest,
		...(keepContent && { content }),
		readingMinutes: readingTime(content?.json),
	};
}

function extractPost(fetchResponse: any): any {
	return withReadingTime(
		fetchResponse?.data?.postCollection?.items?.[0],
		true,
	);
}

function extractPostEntries(fetchResponse: any): any[] {
	return (fetchResponse?.data?.postCollection?.items ?? []).map(
		(post: any) => withReadingTime(post, false),
	);
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
	const entry = await fetchGraphQL(
		`query {
      postCollection(where: { slug: ${JSON.stringify(slug)} }, preview: true, limit: 1) {
        items {
          ${POST_FIELDS}
        }
      }
    }`,
		true,
	);
	return extractPost(entry);
}

/** Newest first, with `readingMinutes` and no body. */
export async function getAllPosts(isDraftMode: boolean): Promise<any[]> {
	const entries = await fetchGraphQL(
		`query {
      postCollection(where: { slug_exists: true }, order: date_DESC, preview: ${
			isDraftMode ? "true" : "false"
		}, limit: 20) {
        items {
          ${POST_LIST_FIELDS}
        }
      }
    }`,
		isDraftMode,
	);
	return extractPostEntries(entries);
}

export async function getPostAndMorePosts(
	slug: string,
	preview: boolean,
): Promise<any> {
	const [entry, entries] = await Promise.all([
		fetchGraphQL(
			`query {
      postCollection(where: { slug: ${JSON.stringify(slug)} }, preview: ${
				preview ? "true" : "false"
			}, limit: 1) {
        items {
          ${POST_FIELDS}
        }
      }
    }`,
			preview,
		),
		fetchGraphQL(
			`query {
       postCollection(where: { slug_not_in: [${JSON.stringify(slug)}] }, order: date_DESC, preview: ${
				preview ? "true" : "false"
			}, limit: 2) {
        items {
          ${POST_LIST_FIELDS}
        }
      }
    }`,
			preview,
		),
	]);
	return {
		post: extractPost(entry),
		morePosts: extractPostEntries(entries),
	};
}

// --- Resume -----------------------------------------------------------------

export async function getResumeItems(preview: boolean = false) {
	const entries = await fetchGraphQL(
		`query {
			resumeItemCollection(order: roleEndDate_DESC, preview: ${preview}, limit: 20) {
				items {
					companyName
					role
					resumeItemCategory
					roleStartDate
					roleEndDate
					roleDescription {
						json
					}
				}
			}
		}`,
		preview,
	);

	return entries?.data?.resumeItemCollection?.items ?? [];
}

// --- Work -------------------------------------------------------------------

// Contentful stores some links without a scheme ("poplivelykc.com"), which the
// browser treats as a path on this site. Add https:// when none is present.
function normalizeExternalUrl(url?: string | null) {
	if (!url) return url;
	const trimmed = url.trim();
	if (/^(https?:|mailto:|tel:|\/)/i.test(trimmed)) return trimmed;
	return `https://${trimmed}`;
}

function normalizeWorkItem(item: any) {
	if (!item) return item;
	return {
		...item,
		liveSiteUrl: normalizeExternalUrl(item.liveSiteUrl),
		codeRepoUrl: normalizeExternalUrl(item.codeRepoUrl),
	};
}

/** Everything the homepage cards and the Work index need: no rich text. */
const WORK_LIST_FIELDS = `
	title
	slug
	shortBlurb
	coverImage {
		url
		description
	}
	techTags
	liveSiteUrl
	codeRepoUrl
`;

const WORK_DETAIL_FIELDS = `
	${WORK_LIST_FIELDS}
	fullDescription {
		json
		links {
			assets {
				block {
					sys { id }
					url
					description
				}
			}
		}
	}
`;

let warnedAboutOrder = false;

/**
 * All work items, lowest `order` first (the first is featured on the
 * homepage). Light query: no `fullDescription`, so the nested rich-text links
 * no longer push it over Contentful's query complexity limit, which is what
 * the old `limit: 10` workaround was hiding.
 *
 * If the `order` field is not published on the content type yet, Contentful
 * rejects the query; retry without it and keep Contentful's default order.
 */
export async function getWorkItemList(preview: boolean = false) {
	const run = (withOrder: boolean) =>
		fetchGraphQL(
			`query {
				workItemCollection(${withOrder ? "order: order_ASC, " : ""}preview: ${preview}, limit: 50) {
					items {
						${WORK_LIST_FIELDS}
						${withOrder ? "order" : ""}
					}
				}
			}`,
			preview,
		);

	let entries;
	try {
		entries = await run(true);
	} catch (error) {
		if (!/\border\b/.test(String(error))) throw error;
		if (!warnedAboutOrder) {
			warnedAboutOrder = true;
			console.warn(
				"Contentful: `order` is not available on WorkItem yet; using the default order.",
			);
		}
		entries = await run(false);
	}

	return (entries?.data?.workItemCollection?.items ?? []).map(
		normalizeWorkItem,
	);
}

/** The projects either side of `slug` in `order`. Either may be null at the ends. */
export async function getAdjacentWorkItems(
	slug: string,
	preview: boolean = false,
) {
	const items = await getWorkItemList(preview);
	const index = items.findIndex((item: any) => item.slug === slug);
	if (index === -1) return { previous: null, next: null };
	return {
		previous: items[index - 1] ?? null,
		next: items[index + 1] ?? null,
	};
}

export async function getWorkItemBySlug(
	slug: string,
	preview: boolean = false,
) {
	const entries = await fetchGraphQL(
		`query {
			workItemCollection(where: { slug: ${JSON.stringify(slug)} }, preview: ${preview}, limit: 1) {
				items {
					${WORK_DETAIL_FIELDS}
				}
			}
		}`,
		preview,
	);

	return (
		normalizeWorkItem(entries?.data?.workItemCollection?.items?.[0]) ?? null
	);
}

// --- Content blocks ---------------------------------------------------------

export async function getContentBlock(title: string, preview: boolean = false) {
	const entry = await fetchGraphQL(
		`query {
				contentBlockCollection(where: { title: ${JSON.stringify(title)} }, preview: ${preview}, limit: 1) {
					items {
					title
					content {
						json
						links {
							assets {
								block {
									sys { id }
									url
									description
								}
							}
						}
					}
				}
			}
		}`,
		preview,
	);

	return entry?.data?.contentBlockCollection?.items?.[0];
}
