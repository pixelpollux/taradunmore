import StickerButton from "@/app/ui/StickerButton";

export function DownloadPdf() {
	return (
		<div className="p-6">
			<StickerButton href="/resume.pdf" download>
				Download PDF
			</StickerButton>
		</div>
	);
}
