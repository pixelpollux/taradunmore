import DotShadow from "@/app/ui/DotShadow";

function Box({ label }: { label: string }) {
	return (
		<div className="w-48 rounded-card border border-plum bg-surface p-5 font-bold">
			{label}
		</div>
	);
}

export function ThreeInks() {
	return (
		<div className="flex flex-wrap gap-12 p-4">
			<DotShadow ink="lime"><Box label="Lime dots" /></DotShadow>
			<DotShadow ink="orchid"><Box label="Orchid dots" /></DotShadow>
			<DotShadow ink="amber" offset={16}><Box label="Amber, 16px" /></DotShadow>
		</div>
	);
}
