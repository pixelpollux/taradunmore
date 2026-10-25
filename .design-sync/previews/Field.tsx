import Field from "@/app/ui/Field";

export function States() {
	return (
		<div className="grid max-w-md gap-6 p-4">
			<Field label="Name" name="name" autoComplete="name" required />
			<Field
				label="Email"
				name="email"
				type="email"
				defaultValue="not-an-email"
				error="That email doesn't look quite right."
			/>
			<Field label="Message" name="message" multiline />
		</div>
	);
}
