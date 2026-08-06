import Card from "@/app/ui/Card";
import Headline from "@/app/ui/Headline";
import Button from "@/app/ui/Button";
import CoverImage from "@/app/ui/CoverImage";
import { COVER_IMAGE_DATAURI } from "./_fixtures";

export function Default() {
	return (
		<Card cardVariant="thick">
			<Headline text="Thick padding" headlineVariant="secondary" headlineLevel="h3" />
			<p>The default card variant — generous padding, used for standalone content blocks.</p>
		</Card>
	);
}

export function Slim() {
	return (
		<Card cardVariant="slim">
			<Headline text="Slim padding" headlineVariant="secondary" headlineLevel="h3" />
			<p>Tighter padding — used for compact list rows like the contact links.</p>
		</Card>
	);
}

export function WorkItem() {
	return (
		<Card cardVariant="tight" className="flex flex-col gap-3 max-w-[22rem]">
			<CoverImage title="Design system sync" url={COVER_IMAGE_DATAURI} slug="ds-sync" />
			<div className="p-4 flex flex-col gap-2">
				<h3 className="text-xl font-bold">Design system sync</h3>
				<p className="text-sm">
					Syncing this site's real components into Claude Design.
				</p>
				<Button buttonVariant="primary" buttonSize="xs" text="More Info" />
			</div>
		</Card>
	);
}

export function Clickable() {
	return (
		<Card cardVariant="slim" isClickable>
			<Headline text="Clickable card" headlineVariant="secondary" headlineLevel="h3" />
			<p>Lifts and shadows on hover — used for the whole card acting as a link.</p>
		</Card>
	);
}
