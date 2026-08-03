import { Cherry_Bomb_One } from "next/font/google";
import Headline from "@/app/ui/Headline";

const cherry = Cherry_Bomb_One({
	variable: "--font-cherry",
	subsets: ["latin"],
	display: "swap",
	weight: "400",
});
export default function HiHero() {
	return (
		// <div className='flex flex-col justify-center items-center h-screen w-screen'>
		<>
			<Headline
				text='hi!'
				headlineLevel='h1'
				headlineVariant='display'
				className={`flex m-0 p-0 lg:text-[110vh] text-[var(--text)] font-cherry ms-0 me-0 justify-center tracking-[1rem] lg:leading-[80vh] ${cherry.variable} lg:h-[100vh]`}
			/>
			{/* <h1
				className={
					`flex m-0 p-0 text-[120vh] text-[var(--text)] font-bold font-cherry ms-0 me-0 justify-center tracking-[1rem] leading-[80vh] stroke-[0.5rem] stroke-pink-500 fill-transparent h-[100vh] ` +
					cherry.variable
				}
			> */}
			{/* -webkit-text-stroke: 0.5rem var(--text);
	-webkit-text-fill-color: transparent; */}
			{/* 	hi!
			</h1> */}
		</>
		// </div>
	);
}
