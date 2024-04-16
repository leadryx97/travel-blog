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
	const response = await fetch('http://localhost:1337/api/posts');
	const data = await response.json();
	return data.data.map((post) => ({
		slug: String(post.attributes.slug),
	}));
}

export default async function BlogPost({ params }) {
	const { slug } = params;
	console.log('slug:', slug);
	const response = await fetch(`
	http://localhost:1337/api/posts/`);
	const postData = await response.json();
	console.log('post:', postData);

	const post = postData.data;

	console.log('post antwort:', post);

	return (
		<div>
			<h1>Blog Post</h1>
			<div>
				{post.map((item) => (
					<div key={item.id}>
						<h1>{item.attributes.Title}</h1>
						{/* Render other post data here */}
					</div>
				))}
			</div>
		</div>
	);
}
