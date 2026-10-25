import { StaticCard } from "@/app/ui/Card";
import Headline from "@/app/ui/Headline";
import Tag from "@/app/ui/Tag";

export function Default() {
	return (
		<div className="max-w-sm p-4">
			<StaticCard ink="lime">
				<Headline variant="card" level="h3">
					Static card
				</Headline>
				<p className="mt-2 text-small text-plum-muted">
					Dots sit still. Used for containers that do nothing when you touch them.
				</p>
			</StaticCard>
		</div>
	);
}

export function InksAndTilt() {
	return (
		<div className="grid max-w-3xl grid-cols-1 gap-10 p-4 md:grid-cols-3">
			<StaticCard ink="lime" tilt={-0.8}>
				<Headline variant="card" level="h3">Lime</Headline>
			</StaticCard>
			<StaticCard ink="orchid" tilt={0.8}>
				<Headline variant="card" level="h3">Orchid</Headline>
			</StaticCard>
			<StaticCard ink="amber" shape="panel" offset={14}>
				<Headline variant="card" level="h3">Amber panel</Headline>
			</StaticCard>
		</div>
	);
}

export function WithTags() {
	return (
		<div className="max-w-sm p-4">
			<StaticCard ink="orchid">
				<Headline variant="card" level="h3">Midwest Burners</Headline>
				<div className="mt-3 flex flex-wrap gap-2">
					<Tag tone="lime">WordPress</Tag>
					<Tag tone="orchid">PHP</Tag>
					<Tag tone="amber">SCSS/Sass</Tag>
				</div>
			</StaticCard>
		</div>
	);
}
