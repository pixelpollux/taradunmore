import Layout from "./Layout";
import { StaticCard } from "@/app/ui/Card";
import Tag, { toneAt } from "@/app/ui/Tag";

/**
 * Both lists are in priority order: the first categories and the first skills
 * in each are what shows up first, so put what you most want to be hired for
 * at the top. (They used to be sorted A to Z, which buried that.)
 */
interface SkillCategory {
	label: string;
	skills: string[];
}
const skillCategories: SkillCategory[] = [
	{
		label: "Languages/Frameworks",
		skills: [
			"JavaScript",
			"TypeScript",
			"Java",
			"React",
			"Next.js",
			"Sass",
			"HTML",
			"CSS",
			"Node.js",
		],
	},
	{
		label: "CMS/Platforms",
		skills: ["Adobe Experience Manager (AEM)", "WordPress", "Contentful"],
	},
	{
		label: "Testing & CI/CD",
		skills: ["Jest", "GitHub Actions", "eslint", "Prettier", "Maven"],
	},
	{ label: "Accessibility", skills: ["Semantic HTML", "WCAG", "ARIA"] },
	{ label: "UI/UX", skills: ["Figma", "Storybook"] },
	{
		label: "Version Control",
		skills: ["Git", "GitHub", "Bitbucket"],
	},
	{
		label: "Project Management & Collaboration",
		skills: ["Jira", "Confluence", "Slack", "Trello", "Notion"],
	},
	{ label: "AI Tools", skills: ["Claude Code", "Copilot", "Vercel V0"] },
];

const dotFill = {
	lime: "bg-lime",
	orchid: "bg-orchid",
	amber: "bg-amber",
} as const;

export default async function SkillsSection() {
	return (
		<Layout id='skills' title='Skills'>
			<StaticCard ink='lime' offset={14} shape='panel' pad='lg'>
				<div className='grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-10 gap-y-10'>
					{skillCategories.map((category, index) => {
						const tone = toneAt(index);
						return (
							<div key={category.label}>
								<h3 className='mb-4 flex items-center gap-2 text-label uppercase'>
									<span
										aria-hidden='true'
										className={`size-3 flex-none rounded-full border-2 border-plum ${dotFill[tone]}`}
									/>
									{category.label}
								</h3>
								<ul className='flex flex-wrap gap-2'>
									{category.skills.map((skill) => (
										<li key={skill}>
											<Tag tone={tone}>{skill}</Tag>
										</li>
									))}
								</ul>
							</div>
						);
					})}
				</div>
			</StaticCard>
		</Layout>
	);
}
