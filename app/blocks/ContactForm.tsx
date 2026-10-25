"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import Field from "@/app/ui/Field";

const initialState: ContactState = { ok: false };

export default function ContactForm() {
	const [state, formAction, pending] = useActionState(sendContact, initialState);
	const formRef = useRef<HTMLFormElement>(null);

	// Move focus to the first invalid field after a failed submit.
	useEffect(() => {
		if (state.errors) {
			formRef.current
				?.querySelector<HTMLElement>("[aria-invalid='true']")
				?.focus();
		}
	}, [state]);

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
					</div>
				)}
			</div>

			{!state.ok && (
				<form
					ref={formRef}
					action={formAction}
					noValidate
					className='flex flex-col gap-6'
				>
					{state.formError && (
						<div
							role='alert'
							className='rounded-field border border-amber-800 bg-amber-100 p-4 font-bold text-amber-800'
						>
							{state.formError}
						</div>
					)}
					<Field
						label='Name'
						name='name'
						autoComplete='name'
						required
						defaultValue={state.values?.name}
						error={state.errors?.name}
					/>
					<Field
						label='Email'
						name='email'
						type='email'
						autoComplete='email'
						required
						defaultValue={state.values?.email}
						error={state.errors?.email}
					/>
					<Field
						label='Subject'
						name='subject'
						required
						defaultValue={state.values?.subject}
						error={state.errors?.subject}
					/>
					<Field
						label='Message'
						name='message'
						multiline
						required
						defaultValue={state.values?.message}
						error={state.errors?.message}
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
