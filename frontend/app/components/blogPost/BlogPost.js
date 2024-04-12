// import next.js image component
import Image from 'next/image';

// import text block component
import TextBlock from './TextBlock';

// define blog post component
// extract slug property with params argument
export default async function BlogPost({ params }) {
	const { slug } = params;
	// fetch blog post data from strapi api
	const response = await fetch(`
	http://localhost:1337/api/posts/?[filters][slug]=${slug}&populate[0]=CoverImage&populate[1]=CoverImage.url&populate=Blocks&populate=Blocks.id`);
	// parse json data from the response body
	const postData = await response.json();
	// variable for post data object
	const post = postData.data;

	const blocks = post[0].attributes.Blocks;
	console.log('Blocks?', blocks);

	blocks.forEach((block) => {
		console.log('Component:', block.__component);
	});

	// variable for cover image
	const coverImage = post[0].attributes.CoverImage;
	// variable for cover image url
	const coverImageUrl = coverImage.data.attributes.url;
	// variable for full cover image url
	const fullImageURL = 'http://localhost:1337' + coverImageUrl;

	// variable for cover image alt text
	const coverImageAlt = coverImage.data.attributes.alternativeText;

	return (
		<div>
			{/* map function on post array to iterate over each blog post item */}
			{post.map((item) => (
				// set unique key attribute to post item id
				<div key={item.id}>
					<Image
						src={fullImageURL}
						alt={coverImageAlt}
						width="500"
						height="400"
					/>
					<h1>{item.attributes.Title}</h1>
					<p>{item.attributes.Date}</p>
					<p>{item.attributes.Intro}</p>
					<p>{item.attributes.Content}</p>

					{/* Iterate over the dynamicZone blocks */}
					{item.attributes.Blocks.map((block, index) => {
						// Switch based on the __component value of each block
						switch (block.__component) {
							case 'post.image-slider':
								return <div />;
							// if there is a text block in the dynamic zone, render TextBlock component
							case 'post.text':
								return <TextBlock text={block.Text} />;
							case 'post.single-image':
								return <div />;
							// Add cases for other components as needed
							default:
								return null;
						}
					})}
				</div>
			))}
		</div>
	);
}
