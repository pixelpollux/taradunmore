import { getResumeItems } from "@/lib/api";
import ResumeList from "./ResumeList";

export default async function ResumeSection() {
	const resumeItems = await getResumeItems();

	return <ResumeList items={resumeItems} />;
}
