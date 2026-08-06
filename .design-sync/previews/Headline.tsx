import Headline from "@/app/ui/Headline";

export function Default() {
	return <Headline text="let's connect!" />;
}

export function Highlighter() {
	return <Headline text="Tara" headlineVariant="highlighter" />;
}

export function Display() {
	return <Headline text="hi!" headlineVariant="display" headlineLevel="h1" />;
}

export function Levels() {
	return (
		<div className="flex flex-col gap-2">
			<Headline text="Heading level 1" headlineLevel="h1" />
			<Headline text="Heading level 2" headlineLevel="h2" />
			<Headline text="Heading level 3" headlineLevel="h3" />
		</div>
	);
}
