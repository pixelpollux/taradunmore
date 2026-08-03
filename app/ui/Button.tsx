// import "../../index.css";

const clickableVariants = {
	true: "hover:cursor-pointer hover:translate-x-[-.25rem] hover:translate-y-[-.25rem] hover:shadow-[.25rem_.25rem_0_0_color-mix(in_oklch,var(--accent)_30%,transparent)] transition-[transform,box-shadow] duration-300 ease-in-out cursor-pointer",
	false: "cursor-default",
};

const buttonBaseStyles = {
	fontFamily: "var(--sans)",
	// fontWeight: "bold",
	letterSpacing: "1px",
	// cursor: "pointer",
};

// TODO: break out into tailwind classes instead of inline styles
const buttonVariants = {
	primary: {
		backgroundColor: "var(--text)",
		color: "color-mix(in oklch, var(--accent) 70%, #ffffff)",
		border: "solid 2px var(--text)",
		borderRadius: "30px",
	},
	secondary: {
		backgroundColor: "var(--bg)",
		color: "var(--text)",
		border: "solid 2px var(--text)",
		borderRadius: "30px",
	},
	tertiary: {
		border: "none",
		backgroundColor: "transparent",
		color: "var(--text)",
	},
	disabled: {
		border: "solid 2px var(--grey)",
		backgroundColor: "var(--bg)",
		color: "var(--grey)",
		borderRadius: "30px",
	},
	disabledPill: {
		border: "solid 2px var(--grey)",
		backgroundColor: "var(--bg)",
		color: "var(--grey)",
		borderRadius: "30px",
	},
};
const buttonSizes = {
	xs: "px-2 py-1 leading-[1] text-xs font-semibold",
	sm: "px-3 py-2 text-md font-semibold",
	md: "px-3 py-4 text-md font-bold",
};

export default function Button({
	text,
	buttonVariant = "primary",
	buttonSize = "sm",
	href,
	onClick,
	isClickable = true,
	className = "",
}: {
	text: string;
	buttonVariant?:
		| "primary"
		| "secondary"
		| "tertiary"
		| "disabled"
		| "disabledPill";
	buttonSize?: "xs" | "sm" | "md";
	href?: string;
	className?: string;
	isClickable?: boolean;
	onClick?: () => void;
}) {
	const isDisabledVariant =
		buttonVariant === "disabled" || buttonVariant === "disabledPill";

	return (
		<>
			{isDisabledVariant ? (
				<span
					className={`${clickableVariants["false"]} ${className} ${buttonSizes[buttonSize]}`}
					aria-disabled='true'
					style={{
						...buttonBaseStyles,
						...buttonVariants[buttonVariant],
					}}
				>
					{text}
				</span>
			) : href ? (
				<a
					className={`${clickableVariants[isClickable ? "true" : "false"]} ${className} ${buttonSizes[buttonSize]}`}
					href={href}
					style={{
						...buttonBaseStyles,
						...buttonVariants[buttonVariant],
					}}
				>
					{text}
				</a>
			) : (
				<button
					type='button'
					className={`${clickableVariants[isClickable ? "true" : "false"]} ${className} ${buttonSizes[buttonSize]}`}
					onClick={onClick}
					style={{
						...buttonBaseStyles,
						...buttonVariants[buttonVariant],
					}}
				>
					{text}
				</button>
			)}
		</>
	);
}
