import ContentfulImage from "@/lib/contentful-image";

/** Rotated headshot with the pink and lime outline rings, shared by the drafts. */
export default function Headshot({ className = "" }: { className?: string }) {
	return (
		<div className={`relative rotate-[5deg] ${className}`}>
			<div className='absolute -inset-3 -rotate-3 rounded-[2rem] border-2 border-[var(--accent)] z-[5]'></div>
			<ContentfulImage
				src='/assets/imgs/headshot-4x5.jpg'
				alt='Tara Dunmore'
				width={300}
				height={375}
				className='relative z-[1] w-full rounded-[2rem] border-2 border-[var(--text)]'
			/>
			<div className='absolute -inset-3 rotate-2 rounded-[2rem] border-2 border-[var(--accent-secondary)] z-0'></div>
		</div>
	);
}
