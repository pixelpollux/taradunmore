import { Mail } from "lucide-react";
import ContactLink from "@/app/ui/ContactLink";
import { GithubIcon, LinkedinIcon } from "@/app/ui/BrandIcons";

export function ThreeChannels() {
	return (
		<div className="flex flex-wrap gap-4">
			<ContactLink
				label="GitHub"
				handle="@pixelpollux"
				href="https://github.com/pixelpollux"
				icon={GithubIcon}
				tone="lime"
			/>
			<ContactLink
				label="LinkedIn"
				handle="in/tarajdunmore"
				href="https://linkedin.com/in/tarajdunmore"
				icon={LinkedinIcon}
				tone="orchid"
			/>
			<ContactLink
				label="Email"
				handle="me@taradunmore.com"
				href="mailto:me@taradunmore.com"
				icon={Mail}
				tone="amber"
			/>
		</div>
	);
}
