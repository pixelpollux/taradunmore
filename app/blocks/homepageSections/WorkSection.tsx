import Layout from "./Layout";
import { getAllWorkItems as getWorkItems } from "@/lib/api";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import ContentfulImage from "@/lib/contentful-image";

export default async function WorkSection() {
	const workItems = await getWorkItems();
	const [featured, ...rest] = workItems;
	const gridItems = rest.slice(0, 3);

	return (
		<>
			<Layout
				text='work'
				id='work-section'
				headerActions={
					<Button
						buttonVariant='secondary'
						text='See more work →'
						href='/work'
					/>
				}
			>
				<div className='flex flex-col gap-6'>
					{featured && (
						<Card
							cardVariant='tight'
							className='flex flex-col md:flex-row gap-6 md:items-center'
						>
							{featured.coverImage?.url && (
								<div className='md:w-full lg:w-1/2'>
									<ContentfulImage
										src={featured.coverImage.url}
										alt={
											featured.coverImage.description ||
											featured.title
										}
										width={640}
										height={400}
										// variant='card--hero-post'
										className='rounded-t-3xl border-b-2 border-b-[var(--text)] md:rounded-l-3xl md:border-b-0 md:rounded-r-none md:border-2 md:border-r-[var(--text)]'
									/>
								</div>
							)}
							<div className='h-full p-4 md:p-6 md:w-1/2 flex flex-col gap-3'>
								<span className='eyebrow w-fit'>
									★ Featured
								</span>
								<h3 className='text-2xl font-bold'>
									{featured.title}
								</h3>
								<p>{featured.shortBlurb}</p>
								{featured.techTags?.length > 0 && (
									// TODO: make this a component
									// TODO: spacing within card on featured work item is off, need to fix
									<>
										<div className='flex flex-wrap gap-2 mt-auto'>
											{featured.techTags.map(
												(tag: string) => (
													<Button
														key={tag}
														text={tag}
														className='tag'
														buttonVariant='disabledPill'
														buttonSize='xs'
													/>
												),
											)}
										</div>
										<div className='flex flex-row flex-wrap gap-2 mt-auto justify-center self-center'>
											{/* more info */}
											<div>
												<Button
													buttonVariant='primary'
													buttonSize='xs'
													text='More Info'
													href={`/work/${featured.slug}`}
													className='text-[var(--text-inverse)]'
												/>
											</div>
											{/* live site */}
											{featured.liveSiteUrl && (
												<div>
													<Button
														buttonVariant='secondary'
														buttonSize='xs'
														text='Live Site'
														href={
															featured.liveSiteUrl
														}
													/>
												</div>
											)}
											{/* code repo */}
											{featured.codeRepoUrl && (
												<div>
													<Button
														buttonVariant='secondary'
														buttonSize='xs'
														text='Code Repo'
														href={
															featured.codeRepoUrl
														}
													/>
												</div>
											)}
										</div>
									</>
								)}
							</div>{" "}
						</Card>
					)}

					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{gridItems.map((item: any, idx: number) => (
							<Card
								key={item.slug ?? idx}
								cardVariant='tight'
								className='flex flex-col gap-3 h-full'
								id={`work-item-${idx + 1}`}
							>
								{item.coverImage?.url && (
									<div>
										<ContentfulImage
											src={item.coverImage.url}
											alt={
												item.coverImage.description ||
												item.title
											}
											width={640}
											height={400}
											className='rounded-t-3xl border-b-2 border-b-[var(--text)]'
										/>
									</div>
								)}
								<div className='p-4 flex flex-col gap-2 h-full'>
									<h3 className='text-xl font-bold'>
										{item.title}
									</h3>
									<p className='text-sm'>{item.shortBlurb}</p>
									{item.techTags?.length > 0 && (
										<div className='flex flex-wrap gap-2 mt-auto'>
											{item.techTags.map(
												(tag: string) => (
													<Button
														key={tag}
														text={tag}
														className='tag'
														buttonVariant='disabled'
														buttonSize='xs'
													/>
												),
											)}
										</div>
									)}
									<div className='flex flex-row flex-wrap gap-2 mt-auto justify-center self-center'>
										{/* more info */}
										<div>
											<Button
												buttonVariant='primary'
												buttonSize='xs'
												text='More Info'
												href={`/work/${item.slug}`}
												className='text-[var(--text-inverse)]'
											/>
										</div>
										{/* live site */}
										{item.liveSiteUrl && (
											<div>
												<Button
													buttonVariant='secondary'
													buttonSize='xs'
													text='Live Site'
													href={item.liveSiteUrl}
												/>
											</div>
										)}
										{/* code repo */}
										{item.codeRepoUrl && (
											<div>
												<Button
													buttonVariant='secondary'
													buttonSize='xs'
													text='Code Repo'
													href={item.codeRepoUrl}
												/>
											</div>
										)}
									</div>
								</div>
							</Card>
						))}
					</div>
				</div>
			</Layout>
		</>
	);
}
