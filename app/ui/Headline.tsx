import React from "react";

const headlineVariants = {
	default: "headline",
	primary: "headline headline--primary",
	secondary: "headline headline--secondary",
	tertiary: "headline headline--tertiary",
	highlighter: "headline headline--highlighter font-bold",
    display: "headline headline--display",
};
const headlineLevels = {
	default: "h2",
	h1: "h1",
	h2: "h2",
	h3: "h3",
};

export default function Headline({
	text,
	headlineVariant = "default",
	headlineLevel = "default",
    className = "",
    id = "",
}: {
	text: string;
	headlineVariant?:
		| "primary"
		| "secondary"
		| "tertiary"
		| "highlighter"
		| "display"
		| "default";
	headlineLevel?: "h1" | "h2" | "h3" | "default";
    className?: string;
    id?: string;
}) {
	return (
		<>
			{React.createElement(
				headlineLevels[headlineLevel] || "h2",
				{ className: className, id: id },
				<span className={headlineVariants[headlineVariant]}>
					{text}
				</span>,
			)}
		</>
	);
}
