import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getContentBlock } from "@/lib/api";

import Layout from "./Layout";

export default async function AboutSection() {
	const about = await getContentBlock("About");

	return (
		<>
			<Layout text='about me' id='about-section' bgColor='bg-[var(--bg-shaded)]'>
				<div>
					{about?.content?.json &&
						documentToReactComponents(about.content.json)}
				</div>
			</Layout>
		</>
	);
}
