// One paper-grain layer per page (DESIGN.md "Riso effects"). Fixed, so the
// filter only paints one viewport. Decorative: hidden from assistive tech.
export default function Grain() {
	return (
		<svg
			aria-hidden='true'
			className='pointer-events-none fixed inset-0 z-[60] h-full w-full'
			style={{ opacity: "var(--riso-grain-opacity)" }}
		>
			<filter id='riso-grain'>
				<feTurbulence
					type='fractalNoise'
					baseFrequency='0.8'
					numOctaves={2}
					stitchTiles='stitch'
				/>
				<feColorMatrix
					type='matrix'
					values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3 0 0 0 -1.5'
				/>
			</filter>
			<rect width='100%' height='100%' filter='url(#riso-grain)' />
		</svg>
	);
}
