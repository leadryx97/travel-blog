// import next.js image component
import Image from 'next/image';
// import text block component
import TextBlock from './TextBlock';
// import single image component
import SingleImage from './SingleImage';
// import image slider component
import ImageSlider from './ImageSlider';

// define blog post component
// extract slug property with params argument
export default async function BlogPost({ params }) {
	const { slug } = params;
	// fetch blog post data from strapi api
	const response = await fetch(
		`http://localhost:1337/api/posts/?[filters][slug]=${slug}&populate[0]=CoverImage&populate[1]=CoverImage.url&populate=Blocks&populate=Blocks.SingleImage.data.attributes.url&populate=Blocks.ImageSlider.data`
	);
	// parse json data from the response body
	const postData = await response.json();
	// variable for post data object
	const post = postData.data;

	// variable for cover image
	const coverImage = post[0].attributes.CoverImage;
	// variable for cover image url
	const coverImageUrl = coverImage.data.attributes.url;
	// variable for full cover image url
	const fullImageURL = 'http://localhost:1337' + coverImageUrl;

	const blocks = post[0].attributes.Blocks;
	const singleImgBlockURLs = [];
	const singleImgBlockAltText = [];
	const singleImgBlockCaption = [];

	const ImageSliderElements = [];

	blocks.forEach((block) => {
		console.log('Component:', block.__component);
		// Check if the block is a single image component and if SingleImage property exists
		if (block.__component === 'post.single-image' && block.SingleImage) {
			// Access the SingleImage property and then the data property and then the attributes property and then the url property
			const singleImageBlock = block.SingleImage.data.attributes.url;
			const singleImageBlockURL = 'http://localhost:1337' + singleImageBlock;
			singleImgBlockURLs.push(singleImageBlockURL);

			const singleImageBlockAlt =
				block.SingleImage.data.attributes.alternativeText;
			singleImgBlockAltText.push(singleImageBlockAlt);

			const singleImgCaption = block.SingleImage.data.attributes.caption;
			singleImgBlockCaption.push(singleImgCaption);
		}

		if (block.__component === 'post.image-slider' && block.ImageSlider) {
			const ImageSliderData = block.ImageSlider.data;
			ImageSliderElements.push(ImageSliderData);
		}
	});

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
								return (
									<ImageSlider
										key={index}
										images={ImageSliderElements[index]}
									/>
								);
							// if there is a text block in the dynamic zone, render TextBlock component
							case 'post.text':
								return <TextBlock key={index} text={block.Text} />;
							// if there is a single image block in the dynamic zone, render SingleImage commponent
							case 'post.single-image':
								return (
									<SingleImage
										key={index}
										imgSrc={singleImgBlockURLs[index]}
										imgAlt={singleImgBlockAltText[index]}
										imgCaption={singleImgBlockCaption[index]}
									/>
								);
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
