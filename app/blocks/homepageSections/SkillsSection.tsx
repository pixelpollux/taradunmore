import Layout from "./Layout";

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

export default async function SkillsSection() {
	const trailingBorderlessCount = skillCategories.length % 2 === 0 ? 2 : 1;
	const borderlessStartIndex =
		skillCategories.length - trailingBorderlessCount;

	return (
		<>
			<Layout text='skills' id='skills-section'>
				<div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-12 '>
					{skillCategories.map((skillCategory, index) => (
						<div
							key={skillCategory.label}
							className={`pb-4 border-b-[1px] border-b-[color-mix(in_oklch,var(--accent)_50%,transparent)] last:border-b-0 ${index >= borderlessStartIndex ? "lg:border-b-0" : ""}`}
						>
							<h3 className='text-lg font-bold tracking-[1] break-normal wrap-anywhere mb-2 italic'>
								{skillCategory.label}
							</h3>
							<ul className='flex flex-row flex-wrap gap-2'>
								{[...skillCategory.skills]
									.sort((firstSkill, secondSkill) =>
										firstSkill.localeCompare(secondSkill),
									)
									.map((skill, index) => (
										<li key={skill}>
											<span>
												{skill}
												{index <
												skillCategory.skills.length - 1
													? ","
													: ""}
											</span>
										</li>
									))}
							</ul>
						</div>
					))}
				</div>
			</Layout>
		</>
	);
}
