const cardVariants = {
	thick: "p-6 md:p-10",
	slim: "p-4 md:p-6",
	tight: "p-0 md:p-0 lg:p-0",
};

const clickableVariants = {
	true: "hover:cursor-pointer hover:translate-x-[-.5rem] hover:translate-y-[-.5rem] hover:shadow-[.5rem_.5rem_0_0_color-mix(in_oklch,var(--accent)_40%,transparent)] transition-[transform,box-shadow] duration-300 ease-in-out",
	false: "",
};

export default function Card({
	children,
	className,
	id,
	cardVariant,
	isClickable = false,
}: {
	children: React.ReactNode;
	className?: string;
	id?: string;
	cardVariant?: "thick" | "slim" | "tight";
	isClickable?: boolean;
}) {
	return (
		<>
			<div
				className={`card border-2 border-solid border-[var(--accent)] rounded-3xl bg-[var(--bg)] ${clickableVariants[isClickable ? "true" : "false"]} ${cardVariants[cardVariant || "thick"] || ""} ${className || ""}`}
				id={id}
			>
				{children}
			</div>
		</>
	);
}
