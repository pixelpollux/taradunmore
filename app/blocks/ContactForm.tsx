"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import {
	CONTACT_MAX,
	validateContact,
	type ContactErrors,
	type ContactValues,
} from "@/lib/contactForm";
import Button from "@/app/ui/Button";
import Field from "@/app/ui/Field";

const initialState: ContactState = { ok: false };

const FIELDS: Array<{ name: keyof ContactValues; label: string }> = [
	{ name: "name", label: "Name" },
	{ name: "email", label: "Email" },
	{ name: "subject", label: "Subject" },
	{ name: "message", label: "Message" },
];

const fieldId = (name: string) => `contact-${name}`;

/**
 * Remounts the form (and its action state) to start a fresh message after a
 * successful send.
 */
export default function ContactForm() {
	const [attempt, setAttempt] = useState(0);
	return (
		<ContactFormInner
			key={attempt}
			onSendAnother={() => setAttempt((count) => count + 1)}
		/>
	);
}

function ContactFormInner({ onSendAnother }: { onSendAnother: () => void }) {
	const [state, formAction, pending] = useActionState(sendContact, initialState);
	const [clientErrors, setClientErrors] = useState<ContactErrors | null>(null);
	const formRef = useRef<HTMLFormElement>(null);

	// Errors found in the browser win until the next valid submit; after that
	// the server's answer is what shows.
	const errors = clientErrors ?? state.errors;
	const errorCount = errors ? Object.keys(errors).length : 0;

	// Check the same rules as the server before submitting, so an empty field
	// does not cost a round trip.
	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		const data = new FormData(event.currentTarget);
		const found = validateContact({
			name: String(data.get("name") ?? "").trim(),
			email: String(data.get("email") ?? "").trim(),
			subject: String(data.get("subject") ?? "").trim(),
			message: String(data.get("message") ?? "").trim(),
		});
		if (Object.keys(found).length) {
			event.preventDefault();
			setClientErrors(found);
		} else {
			setClientErrors(null);
		}
	}

	// Move focus to the first invalid field after a failed submit.
	useEffect(() => {
		if (errorCount) {
			formRef.current
				?.querySelector<HTMLElement>("[aria-invalid='true']")
				?.focus();
		}
	}, [errors, errorCount]);

	return (
		<div>
			<div role='status'>
				{state.ok && (
					<div className='rounded-field border border-plum bg-lime-100 p-6 text-lime-800'>
						<p className='mb-2 font-display text-[26px] leading-tight text-plum'>
							Message sent!
						</p>
						<p className='font-bold'>
							Thanks for reaching out. I&apos;ll get back to you soon.
						</p>
						<div className='mt-5'>
							<Button variant='secondary' onClick={onSendAnother}>
								Send another message
							</Button>
						</div>
					</div>
				)}
			</div>

			{!state.ok && (
				<form
					ref={formRef}
					action={formAction}
					onSubmit={onSubmit}
					noValidate
					className='flex flex-col gap-6'
				>
					{errorCount > 0 && errors && (
						<div
							role='alert'
							className='rounded-field border border-amber-800 bg-amber-100 p-4 text-amber-800'
						>
							<p className='font-bold'>
								{errorCount === 1
									? "One thing needs fixing:"
									: `${errorCount} things need fixing:`}
							</p>
							<ul className='mt-2 list-disc pl-5'>
								{FIELDS.filter(({ name }) => errors[name]).map(
									({ name, label }) => (
										<li key={name}>
											<a
												href={`#${fieldId(name)}`}
												className='font-bold underline underline-offset-4'
											>
												{label}
											</a>
											: {errors[name]}
										</li>
									),
								)}
							</ul>
						</div>
					)}
					{state.formError && (
						<div
							role='alert'
							className='rounded-field border border-amber-800 bg-amber-100 p-4 font-bold text-amber-800'
						>
							{state.formError}
						</div>
					)}
					<Field
						id={fieldId("name")}
						label='Name'
						name='name'
						autoComplete='name'
						maxLength={CONTACT_MAX.name}
						required
						defaultValue={state.values?.name}
						error={errors?.name}
					/>
					<Field
						id={fieldId("email")}
						label='Email'
						name='email'
						type='email'
						autoComplete='email'
						maxLength={CONTACT_MAX.email}
						required
						defaultValue={state.values?.email}
						error={errors?.email}
					/>
					<Field
						id={fieldId("subject")}
						label='Subject'
						name='subject'
						maxLength={CONTACT_MAX.subject}
						required
						defaultValue={state.values?.subject}
						error={errors?.subject}
					/>
					<Field
						id={fieldId("message")}
						label='Message'
						name='message'
						multiline
						maxLength={CONTACT_MAX.message}
						required
						defaultValue={state.values?.message}
						error={errors?.message}
					/>

					{/* Honeypot: invisible to people, tempting to bots. */}
					<div aria-hidden='true' className='absolute -left-[9999px]'>
						<label>
							Company
							<input
								type='text'
								name='company'
								tabIndex={-1}
								autoComplete='off'
							/>
						</label>
					</div>

					<div className='-rotate-2 self-start'>
						<button
							type='submit'
							disabled={pending}
							aria-busy={pending}
							className='lift min-h-tap rounded-full border border-plum bg-grad-lime-amber px-9 py-2 font-display text-[26px] leading-tight text-plum shadow-pop-orchid disabled:opacity-70'
						>
							{pending ? "Sending..." : "Send!"}
						</button>
					</div>
				</form>
			)}
		</div>
	);
}
