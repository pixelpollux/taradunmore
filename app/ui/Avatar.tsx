import ContentfulImage from "@/lib/contentful-image";

/** 52px round photo with a 3px plum border, bold name, optional subtitle. */
export default function Avatar({
	name,
	picture,
	subtitle,
}: {
	name: string;
	picture?: { url?: string | null } | null;
	subtitle?: string;
}) {
	return (
		<div className='flex items-center gap-3'>
			<div className='size-[52px] flex-none overflow-hidden rounded-full border-chip border-plum bg-orchid-100'>
				{picture?.url && (
					<ContentfulImage
						alt=''
						className='h-full w-full object-cover'
						height={104}
						width={104}
						src={picture.url}
					/>
				)}
			</div>
			<div className='leading-tight'>
				<div className='font-bold'>{name}</div>
				{subtitle && (
					<div className='text-small text-plum-muted'>{subtitle}</div>
				)}
			</div>
		</div>
	);
}
