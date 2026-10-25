import Button from "@/app/ui/Button";

export function Primary() {
	return <Button href="/#work">See my work</Button>;
}

export function Secondary() {
	return (
		<Button variant="secondary" href="/#contact">
			Get in touch
		</Button>
	);
}

export function TextLink() {
	return (
		<Button variant="text" href="https://example.com" external>
			Live site
		</Button>
	);
}

export function Disabled() {
	return <Button variant="disabled">Unavailable</Button>;
}

export function InARow() {
	return (
		<div className="flex flex-wrap items-center gap-5">
			<Button>Case study</Button>
			<Button variant="text" href="https://example.com" external>
				Live site
			</Button>
			<Button variant="text" href="https://example.com" external>
				Code
			</Button>
		</div>
	);
}
