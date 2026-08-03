const POST_GRAPHQL_FIELDS = `
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

async function fetchGraphQL(query: string, preview = false): Promise<any> {
	const res = await fetch(
		// TODO: come back to this
		// fetchGraphQL() returns JSON even when the HTTP request fails or when Contentful returns GraphQL errors. That can lead to downstream crashes (e.g., pages reading post.title when post is undefined) with little context. Consider failing fast: validate res.ok, and throw when json.errors is present so the error boundary/logs point at the real cause. Also, the cache tag is currently named "blog" but this helper is used for resume/work/content blocks too, so a more generic tag name avoids confusion.

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
			next: { tags: ["blog"] },
		},
	);
	const json = await res.json();
	if (json.errors) {
		console.error("GraphQL errors:", JSON.stringify(json.errors, null, 2));
	}
	return json;
}

function extractPost(fetchResponse: any): any {
	return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPostEntries(fetchResponse: any): any[] {
	return fetchResponse?.data?.postCollection?.items;
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
	const entry = await fetchGraphQL(
		`query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
		true,
	);
	return extractPost(entry);
}

export async function getAllPosts(isDraftMode: boolean): Promise<any[]> {
	const entries = await fetchGraphQL(
		`query {
      postCollection(where: { slug_exists: true }, order: date_DESC, preview: ${
			isDraftMode ? "true" : "false"
		}, limit: 20) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
		isDraftMode,
	);
	return extractPostEntries(entries);
}

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

export async function getPostAndMorePosts(
	slug: string,
	preview: boolean,
): Promise<any> {
	const entry = await fetchGraphQL(
		`query {
      postCollection(where: { slug: "${slug}" }, preview: ${
			preview ? "true" : "false"
		}, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
		preview,
	);
	const entries = await fetchGraphQL(
		`query {
       postCollection(where: { slug_not_in: [${JSON.stringify(slug)}] }, order: date_DESC, preview: ${
			preview ? "true" : "false"
		}, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
		preview,
	);
	return {
		post: extractPost(entry),
		morePosts: extractPostEntries(entries),
	};
}

const WORK_ITEM_FIELDS = `
	title
	slug
	shortBlurb
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
	coverImage {
		url
		description
	}
	techTags
	liveSiteUrl
	codeRepoUrl
`;

export async function getAllWorkItems(preview: boolean = false) {
	const entries = await fetchGraphQL(
		// TODO: removing the limit breaks things, i don't know why. return later.
		`query {
			workItemCollection(preview: ${preview}, limit: 10) {
				items {
					${WORK_ITEM_FIELDS}
				}
			}
		}`,
		preview,
	);

	return entries?.data?.workItemCollection?.items ?? [];
}

export async function getWorkItemBySlug(
	slug: string,
	preview: boolean = false,
) {
	const entries = await fetchGraphQL(
		`query {
			workItemCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
				items {
					${WORK_ITEM_FIELDS}
				}
			}
		}`,
		preview,
	);

	return entries?.data?.workItemCollection?.items?.[0] ?? null;
}

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
