import Disclosure from "@/app/ui/Disclosure";

export function Rows() {
	return (
		<div className="flex max-w-2xl flex-col gap-8 p-4">
			<Disclosure
				ink="lime"
				defaultOpen
				summary={
					<span className="block">
						<span className="block text-label uppercase">Apr 2021 to Jul 2026</span>
						<span className="block font-display text-[22px] leading-tight">Frontend Software Developer</span>
						<span className="block text-small text-plum-muted">VML</span>
					</span>
				}
			>
				<p>Open by default. A native details element, so it works without JavaScript.</p>
			</Disclosure>
			<Disclosure
				ink="orchid"
				summary={<span className="block font-display text-[22px] leading-tight">Closed row</span>}
			>
				<p>Opens to a softer corner radius.</p>
			</Disclosure>
		</div>
	);
}
