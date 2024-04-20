import BlogPostList from '@/app/components/blogPostList/BlogPostList';

export async function generateStaticParams() {
	try {
		const response = await fetch(
			`https://peaceful-citadel-90180-369fa539b5ab.herokuapp.com/api/posts/`
		);
		if (!response.ok) {
			throw new Error('Failed to fetch posts');
		}
		const data = await response.json();
		return data.data.map((post) => ({
			params: {
				slug: String(post.attributes.slug),
			},
		}));
	} catch (error) {
		console.error('Error fetching posts:', error);
		return [];
	}
}

export default async function BlogPost({ params }) {
	const { slug } = params;
	console.log('slug:', slug);
	const response = await fetch(`
	https://peaceful-citadel-90180-369fa539b5ab.herokuapp.com/api/posts?sort=id:desc&cacheBuster=${Date.now()}&populate[0]=CoverImage&populate[1]=CoverImage.url`);
	const postData = await response.json();
	console.log('post Data List:', postData);

	const post = postData.data;

	console.log('post antwort:', post);

	return (
		<div>
			{post.map((item) => {
				// variable for cover image
				const coverImage = item.attributes.CoverImage;
				// variable for cover image url
				const coverImageUrl = coverImage.data.attributes.url;
				// variable for full cover image url
				const fullImageURL =
					'https://peaceful-citadel-90180-369fa539b5ab.herokuapp.com' +
					coverImageUrl;
				// variable for cover image alt text
				const coverImageAlt = coverImage.data.attributes.alternativeText;

				return (
					<div key={item.id}>
						<BlogPostList
							imgSrc={fullImageURL}
							imgAlt={coverImageAlt}
							date={item.attributes.Date}
							day={item.attributes.Day}
							title={item.attributes.Title}
							slug={item.attributes.slug}
						/>
					</div>
				);
			})}
		</div>
	);
}
