import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * Label + input or textarea with an error state: aria-invalid,
 * aria-describedby, and an Amber 800 message (never color alone).
 */
export default function Field({
	label,
	name,
	id: idProp,
	maxLength,
	type = "text",
	multiline = false,
	rows = 6,
	required,
	autoComplete,
	defaultValue,
	error,
	className,
}: {
	label: string;
	name: string;
	/** Stable id, so an error summary can link to the field. */
	id?: string;
	maxLength?: number;
	type?: string;
	multiline?: boolean;
	rows?: number;
	required?: boolean;
	autoComplete?: string;
	defaultValue?: string;
	error?: string;
	className?: string;
}) {
	const generatedId = useId();
	const id = idProp ?? generatedId;
	const errorId = `${id}-error`;
	const shared = {
		id,
		name,
		maxLength,
		required,
		autoComplete,
		defaultValue,
		"aria-invalid": error ? (true as const) : undefined,
		"aria-describedby": error ? errorId : undefined,
		className: cn(
			"block min-h-tap w-full rounded-field border px-4 py-3 text-body text-plum",
			error ? "border-amber-800 bg-amber-100" : "border-plum bg-paper",
		),
	};

	return (
		<div className={className}>
			<label htmlFor={id} className='mb-2 block text-small font-bold'>
				{label}
				{required && <span aria-hidden='true'> *</span>}
			</label>
			{multiline ? (
				<textarea rows={rows} {...shared} />
			) : (
				<input type={type} {...shared} />
			)}
			{error && (
				<div id={errorId} className='mt-2 text-small font-bold text-amber-800'>
					{error}
				</div>
			)}
		</div>
	);
}
