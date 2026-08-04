import Headline from "@/app/ui/Headline";
import Card from "@/app/ui/Card";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../../components/brand-icons";
const socials = [
	{
		label: "GitHub",
		handle: "@pixelpollux",
		href: "https://github.com/pixelpollux",
		icon: GithubIcon,
	},
	{
		label: "LinkedIn",
		handle: "in/tarajdunmore",
		href: "https://linkedin.com/in/tarajdunmore",
		icon: LinkedinIcon,
	},
	{
		label: "Email",
		handle: "me@taradunmore.com",
		href: "mailto:me@taradunmore.com",
		icon: Mail,
	},
];
export default async function ContactSection() {
	return (
		<>
			<section className='container--outer bg-[color-mix(in_oklch,var(--accent)_30%,transparent)] py-10 lg:py-20'>
				<div className='container--inner container lg:max-w-7xl mx-auto px-8 lg:px-12'>
					<Card id='contact-section'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12'>
							<div className='flex flex-col justify-between gap-4'>
								<Headline
									text="let's connect!"
									headlineVariant='highlighter'
									className='scroll-mt-[var(--nav-height)] text-center sm:text-left'
									id='contact-section-title'
								/>
								<p>
									I'd love to hear from you. Whether you have
									a project in mind, want to collaborate, or
									just want to say hi, feel free to reach out.
								</p>
								<p>
									You can reach me at{" "}
									<a href='mailto:me@taradunmore.com'>
										me@taradunmore.com
									</a>
								</p>{" "}
							</div>
							<div className='flex flex-col gap-4'>
								{socials.map(
									({ label, handle, href, icon: Icon }) => (
										<a
											key={label}
											href={href}
											target='_blank'
											rel='noreferrer noopener'
										>
											<Card
												className='bg-[color-mix(in_oklch,var(--accent)_30%,transparent)]'
												isClickable={true}
												cardVariant='slim'
											>
												<div className='flex items-center justify-between justify-self-center sm:justify-self-auto gap-4'>
													<div className='flex flex-col sm:flex-row items-center justify-self-center sm:justify-self-start gap-4'>
														<span className='inline-flex size-12 items-center justify-center rounded-3xl  bg-[color-mix(in_oklch,var(--accent)_20%,transparent)] text-[--text]'>
															<Icon />
														</span>
														<div className='text-center sm:text-left'>
															<h3 className='font-bold text-lg lg:text-xl'>
																{label}
															</h3>
															<p className='text-sm lg:text-base !mb-0 text-[var(--grey)]'>
																{handle}
															</p>
														</div>
													</div>
													<ArrowUpRight className='hidden sm:flex size-5 shrink-0' />
												</div>
											</Card>
										</a>
									),
								)}
							</div>
						</div>
					</Card>
				</div>
			</section>
		</>
	);
}
