/**
 * Contact form rules, shared so the browser and the server action agree: the
 * form checks these before submitting (no round trip for an empty field), and
 * the action checks them again because a request can skip the form.
 */
export type ContactValues = {
	name: string;
	email: string;
	subject: string;
	message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const CONTACT_MAX: Record<keyof ContactValues, number> = {
	name: 100,
	email: 200,
	subject: 200,
	message: 5000,
};

export function validateContact(values: ContactValues): ContactErrors {
	const errors: ContactErrors = {};
	if (!values.name || values.name.length > CONTACT_MAX.name)
		errors.name = "Add your name so I know who's saying hi.";
	if (
		!/^\S+@\S+\.\S+$/.test(values.email) ||
		values.email.length > CONTACT_MAX.email
	)
		errors.email = "That email doesn't look quite right.";
	if (!values.subject || values.subject.length > CONTACT_MAX.subject)
		errors.subject = "Add a subject so I know what it's about.";
	if (values.message.length < 10 || values.message.length > CONTACT_MAX.message)
		errors.message = "Add a quick message so I know what's up.";
	return errors;
}
