// import post component
import BlogPost from '../../../../components/blogPost/BlogPost';

// function to generate static paths for blog posts based on their slugs
export async function generateStaticParams() {
	// fetch blog post data from strapi api
	const response = await fetch('http://127.0.0.1:1337/api/posts');
	// parse json data from the response body
	const postData = await response.json();
	console.log('PostData:', postData);
	/* maps over the array of blog post data
	returns an array of objects, each containing a slug property
	The slug is extracted from each blog post's attributes and converted to a string */
	return postData.data.map((post) => ({
		slug: String(post.attributes.slug),
	}));
}
// export blog post page which receives params as a prop
export default function BlogPostPage({ params }) {
	// slug is extracted from params object
	const slug = params;
	console.log('Slug page.js:', slug);
	// renders component BlogPost and passes slug as a prop
	return <BlogPost params={slug} />;
}
