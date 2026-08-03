import HeaderNav from "@/app/blocks/HeaderNav";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<HeaderNav />
			{children}
		</>
	);
}
