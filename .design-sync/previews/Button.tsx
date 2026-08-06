import Button from "@/app/ui/Button";

export function Primary() {
	return <Button text="see my work" href="/#work-section" />;
}

export function Secondary() {
	return <Button buttonVariant="secondary" text="get in touch" href="/#contact-section" />;
}

export function Tertiary() {
	return <Button buttonVariant="tertiary" text="Read more" />;
}

export function DisabledTag() {
	return (
		<Button
			text="React"
			className="tag"
			buttonVariant="disabledPill"
			buttonSize="xs"
		/>
	);
}

export function Sizes() {
	return (
		<div className="flex gap-3 items-center">
			<Button text="Extra small" buttonSize="xs" />
			<Button text="Small" buttonSize="sm" />
			<Button text="Medium" buttonSize="md" />
		</div>
	);
}
