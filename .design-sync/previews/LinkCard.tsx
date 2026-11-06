import { CardLink, LinkCard } from "@/app/ui/Card";
import Headline from "@/app/ui/Headline";

export function Default() {
	return (
		<div className="max-w-sm p-4">
			<LinkCard accent="lime" pad="md">
				<p className="mb-1 text-label uppercase">Next project</p>
				<Headline variant="card" level="h3">
					<CardLink href="#">taradunmore.com rebuild</CardLink>
				</Headline>
			</LinkCard>
		</div>
	);
}

export function Accents() {
	return (
		<div className="grid max-w-3xl grid-cols-1 gap-8 p-4 md:grid-cols-3">
			<LinkCard accent="lime" pad="md">
				<Headline variant="card" level="h3">
					<CardLink href="#">Lime</CardLink>
				</Headline>
			</LinkCard>
			<LinkCard accent="orchid" pad="md" tilt={0.6}>
				<Headline variant="card" level="h3">
					<CardLink href="#">Orchid, tilted</CardLink>
				</Headline>
			</LinkCard>
			<LinkCard accent="amber" pad="md">
				<Headline variant="card" level="h3">
					<CardLink href="#">Amber</CardLink>
				</Headline>
			</LinkCard>
		</div>
	);
}
