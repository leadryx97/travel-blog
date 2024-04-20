import BlogPostList from '@/app/components/blogPostList/BlogPostList';

/*// import qs library
import qs from 'qs';
// import next.js image component
import Image from 'next/image';

// define query for post data
const postQuery = qs.stringify({
	populate: {
		// define fields to populate
		fields: ['Title', 'Intro', 'Date', 'Content', 'slug'],
		// define fields of cover image component
		CoverImage: {
			fields: ['url', 'alternativeText'],
		},
	},
});

// fetch post data from strapi
async function getPostData(path) {
	// define base url
	const baseURL = `${process.env.STRAPI_API_URL}`;
	// combining path parameter with base url
	const url = new URL(path, baseURL);
	// sets query parameters for the url
	url.search = postQuery;

	// fetch function to make http request to the url
	try {
		const response = await fetch(url.href);
		// parse response from server as json
		const data = await response.json();
		// logs api response data to console
		console.log('API Response:', data);
		// returns fetched data
		return data;
	} catch (error) {
		console.error(error); // error handling
	}
}

// function for posts
export default async function Post() {
	// assign result of fetching data from '/api/posts'
	const postData = await getPostData('/api/posts');

	console.log(postData);

	// define variables for post data
	const title = postData.data[0].attributes.Title;
	const intro = postData.data[0].attributes.Intro;
	const date = postData.data[0].attributes.Date;
	const content = postData.data[0].attributes.Content;
	const coverImage = postData.data[0].attributes.CoverImage;
	const imageURL = coverImage.data.attributes.url;
	// define base url
	const baseURL = `${process.env.STRAPI_API_URL}`;
	// define complete image url
	const fullImageURL = baseURL + imageURL;

	const slug = postData.data[0].attributes.slug;

	// return post structure
	return (
		<div>
			<Image src={fullImageURL} alt="alt" width="500" height="400" />
			<h1>{title}</h1>
			<p>{date}</p>
			<p>{intro}</p>
			<p>{content}</p>
		</div>
	);
}
*/
export async function generateStaticParams() {
	try {
		const response = await fetch(`http://127.0.0.1:1337/api/posts/`);
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
	http://127.0.0.1:1337/api/posts?cacheBuster=${Date.now()}&populate[0]=CoverImage&populate[1]=CoverImage.url`);
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
				const fullImageURL = 'http://127.0.0.1:1337' + coverImageUrl;
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
