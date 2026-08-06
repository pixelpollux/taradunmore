import CoverImage from "@/app/ui/CoverImage";
import { COVER_IMAGE_DATAURI } from "./_fixtures";

export function Linked() {
	return (
		<CoverImage
			title="Building a design system sync"
			url={COVER_IMAGE_DATAURI}
			slug="building-a-design-system-sync"
		/>
	);
}

export function Unlinked() {
	return <CoverImage title="Work item cover, no link" url={COVER_IMAGE_DATAURI} />;
}
