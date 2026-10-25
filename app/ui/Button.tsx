import type {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
	"inline-flex min-h-tap items-center justify-center gap-2 font-bold leading-tight no-underline",
	{
		variants: {
			variant: {
				primary:
					"lift rounded-full border border-plum bg-plum px-6 py-2 text-paper shadow-pop-lime focus-visible:outline-plum",
				secondary:
					"lift rounded-full border border-plum bg-surface px-6 py-2 text-plum shadow-pop-orchid",
				text: "text-link underline decoration-2 underline-offset-4 hover:decoration-4",
				disabled:
					"cursor-not-allowed rounded-full border border-dashed border-plum-muted bg-surface px-6 py-2 text-plum-muted",
			},
		},
		defaultVariants: { variant: "primary" },
	},
);

type Shared = VariantProps<typeof button> & {
	children: ReactNode;
	className?: string;
	/** Open `href` in a new tab and announce it. */
	external?: boolean;
};

type AsLink = Shared & { href: string } & Omit<
		AnchorHTMLAttributes<HTMLAnchorElement>,
		"href" | "className" | "children"
	>;
type AsButton = Shared & { href?: undefined } & Omit<
		ButtonHTMLAttributes<HTMLButtonElement>,
		"className" | "children"
	>;

/**
 * Renders an <a> when `href` is set, otherwise a <button>. The `disabled`
 * variant renders a non-interactive element with no shadow and no lift.
 */
export default function Button(props: AsLink | AsButton) {
	const { variant, className, children, external, ...rest } = props;
	const classes = button({ variant, className });

	if (variant === "disabled") {
		return (
			<span aria-disabled='true' className={classes}>
				{children}
			</span>
		);
	}

	if ("href" in rest && rest.href) {
		return (
			<a
				{...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
				{...(external && { target: "_blank", rel: "noopener noreferrer" })}
				className={classes}
			>
				{children}
				{external && <span className='sr-only'> (opens in new tab)</span>}
			</a>
		);
	}

	return (
		<button
			type='button'
			{...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
			className={classes}
		>
			{children}
		</button>
	);
}
