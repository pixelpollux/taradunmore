import { LinkCard } from "@/app/ui/Card";
import Headline from "@/app/ui/Headline";

export function Default() {
	return (
		<div className="max-w-sm p-4">
			<LinkCard href="#" accent="lime" pad="md">
				<p className="mb-1 text-label uppercase">Next project</p>
				<Headline variant="card" level="h3">taradunmore.com rebuild</Headline>
			</LinkCard>
		</div>
	);
}

export function Accents() {
	return (
		<div className="grid max-w-3xl grid-cols-1 gap-8 p-4 md:grid-cols-3">
			<LinkCard href="#" accent="lime" pad="md">
				<Headline variant="card" level="h3">Lime</Headline>
			</LinkCard>
			<LinkCard href="#" accent="orchid" pad="md" tilt={0.6}>
				<Headline variant="card" level="h3">Orchid, tilted</Headline>
			</LinkCard>
			<LinkCard href="#" accent="amber" pad="md">
				<Headline variant="card" level="h3">Amber</Headline>
			</LinkCard>
		</div>
	);
}
