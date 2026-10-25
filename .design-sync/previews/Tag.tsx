import Tag from "@/app/ui/Tag";

export function Tones() {
	return (
		<div className="flex flex-wrap gap-3">
			<Tag tone="lime">Next.js</Tag>
			<Tag tone="orchid">React</Tag>
			<Tag tone="amber">Contentful</Tag>
		</div>
	);
}
