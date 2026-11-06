import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Turn Draft Mode off, then go back to the page the editor came from (the
 * Referer, if it is this site) or the homepage.
 */
export async function GET(request: Request) {
	const draft = await draftMode();
	draft.disable();

	let destination = "/";
	try {
		const referer = request.headers.get("referer");
		if (referer) {
			const from = new URL(referer);
			if (from.origin === new URL(request.url).origin) {
				destination = from.pathname + from.search;
			}
		}
	} catch {
		// Malformed Referer: fall back to the homepage.
	}
	redirect(destination);
}
