import Headline from "@/app/ui/Headline";

export function Variants() {
	return (
		<div className="flex flex-col gap-8 p-4">
			<Headline variant="display" level="h2">Tara</Headline>
			<Headline variant="page" level="h2">Page title</Headline>
			<Headline variant="section" level="h2">Section title</Headline>
			<Headline variant="feature" level="h3">Feature title</Headline>
			<Headline variant="card" level="h3">Card title</Headline>
		</div>
	);
}
