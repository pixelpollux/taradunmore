import Hero from "./blocks/Hero";
import AboutSection from "./blocks/homepageSections/AboutSection";
import WorkSection from "./blocks/homepageSections/WorkSection";
import SkillsSection from "./blocks/homepageSections/SkillsSection";
import ResumeSection from "./blocks/homepageSections/ResumeSection/ResumeSection";
import ContactSection from "./blocks/homepageSections/ContactSection";

export default function Page() {
	return (
		<div className='flex flex-col gap-section'>
			<Hero />
			<AboutSection />
			<WorkSection />
			<SkillsSection />
			<ResumeSection />
			<ContactSection />
		</div>
	);
}
