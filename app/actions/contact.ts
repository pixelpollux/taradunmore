"use server";

import { Resend } from "resend";

export type ContactState = {
	ok: boolean;
	errors?: { name?: string; email?: string; message?: string };
	formError?: string;
	values?: { name: string; email: string; message: string };
};

const MAX = { name: 100, email: 200, message: 5000 };

export async function sendContact(
	_prev: ContactState,
	formData: FormData,
): Promise<ContactState> {
	const name = String(formData.get("name") ?? "").trim();
	const email = String(formData.get("email") ?? "").trim();
	const message = String(formData.get("message") ?? "").trim();
	const honeypot = String(formData.get("company") ?? ""); // hidden field, bots fill it

	// Bots get a fake success so they do not retry.
	if (honeypot) return { ok: true };

	const errors: NonNullable<ContactState["errors"]> = {};
	if (!name || name.length > MAX.name)
		errors.name = "Add your name so I know who's saying hi.";
	if (!/^\S+@\S+\.\S+$/.test(email) || email.length > MAX.email)
		errors.email = "That email doesn't look quite right.";
	if (message.length < 10 || message.length > MAX.message)
		errors.message = "Add a quick message so I know what's up.";
	if (Object.keys(errors).length) {
		return { ok: false, errors, values: { name, email, message } };
	}

	const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
	if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
		console.error("contact form: missing RESEND_API_KEY / CONTACT_* env vars");
		return {
			ok: false,
			values: { name, email, message },
			formError:
				"Something went wrong on my end. Please email me directly at me@taradunmore.com.",
		};
	}

	try {
		const { error } = await new Resend(RESEND_API_KEY).emails.send({
			from: CONTACT_FROM_EMAIL,
			to: CONTACT_TO_EMAIL,
			replyTo: email,
			// Strip line breaks so a name cannot inject extra headers.
			subject: `Portfolio message from ${name.replace(/[\r\n]+/g, " ")}`,
			text: message,
		});
		if (error) throw new Error(error.message);
	} catch (error) {
		console.error("contact form: send failed", error);
		return {
			ok: false,
			values: { name, email, message },
			formError:
				"That didn't send. Please try again, or email me at me@taradunmore.com.",
		};
	}

	return { ok: true };
}
