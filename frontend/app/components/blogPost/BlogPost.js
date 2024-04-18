// import next.js image component
import Image from 'next/image';
// import text block component
import TextBlock from './TextBlock';
// import single image component
import SingleImage from './SingleImage';
// import image slider component
import ImageSlider from './ImageSlider';
// import video component
import Video from './Video';
// import youtube video component
import YouTubeVideo from './YouTubeVideo';
// import custom blocks renderer (for content block, which is a rich text field)
import CustomBlocksRenderer from './CustomBlocksRenderer';
// import styles
import styles from '../../styles/components/BlogPost.module.scss';

// define blog post component
// extract slug property with params argument
export default async function BlogPost({ params }) {
	const { slug } = params;
	// fetch blog post data from strapi api
	const response = await fetch(
		`http://127.0.0.1:1337/api/posts/?[filters][slug]=${slug}&populate[0]=CoverImage&populate[1]=CoverImage.url&populate=Blocks&populate=Blocks.SingleImage.data.attributes.url&populate=Blocks.ImageSlider.data&populate=Blocks.Video.data.attributes.url`
	);

	// parse json data from the response body
	const postData = await response.json();
	// variable for post data object
	const post = postData.data[0];
	console.log('Post:', post);
	const title = post.attributes.Title;
	console.log('Titel:', title);
	// variable for cover image
	const coverImage = post.attributes.CoverImage;
	console.log('Cover Image:', coverImage);
	// variable for cover image url
	const coverImageUrl = coverImage.data.attributes.url;
	// variable for full cover image url
	const fullImageURL = 'http://localhost:1337' + coverImageUrl;
	// variable for cover image alt text
	const coverImageAlt = coverImage.data.attributes.alternativeText;
	// variable for dynamic zone (blocks)
	const blocks = post.attributes.Blocks;

	// empty array for single image block urls
	const singleImgBlockURLs = [];
	// empty array for single image block alternative texts
	const singleImgBlockAltText = [];
	// empty array for single image block captions
	const singleImgBlockCaption = [];
	// empty array for image slider data
	const ImageSliderElements = [];
	// empty array for video block urls
	const videoBlockURLs = [];
	// create empty array for youtube video urls
	const youtubeVideoId = [];

	// check if youtube video is present in post
	if (post.attributes.oembed) {
		// parse JSON object of embedded video
		const oembedData = JSON.parse(post.attributes.oembed);
		// extract video ID from the YouTube URL
		const urlParts = oembedData.url.split('v=');
		// add
		youtubeVideoId.push(urlParts[urlParts.length - 1]);
	}

	// check if block component exists and add data to the corresponding array
	blocks.forEach((block) => {
		// Check if the block is a single image component and if SingleImage property exists
		if (block.__component === 'post.single-image' && block.SingleImage) {
			// get the url of the single image block
			const singleImageBlock = block.SingleImage.data.attributes.url;
			// create full url of the image
			const singleImageBlockURL = 'http://localhost:1337' + singleImageBlock;
			// add url to the singleImgBlockURLs array
			singleImgBlockURLs.push(singleImageBlockURL);

			// get alternative text of single image block
			const singleImageBlockAlt =
				block.SingleImage.data.attributes.alternativeText;
			// add alt text to the singleImageBlockAlt array
			singleImgBlockAltText.push(singleImageBlockAlt);

			// get caption of single image block
			const singleImgCaption = block.SingleImage.data.attributes.caption;
			// add caption to the singleImgBlockCaption array
			singleImgBlockCaption.push(singleImgCaption);
		}
		// Check if the block is a image slider component and if image slider property exists
		else if (block.__component === 'post.image-slider' && block.ImageSlider) {
			// get data of image slider block
			const ImageSliderData = block.ImageSlider.data;
			// add data of image slider to the ImageSliderElements array
			ImageSliderElements.push(ImageSliderData);
		}
		// Check if the block is a video component and if video property exists
		else if (block.__component === 'post.video' && block.Video) {
			// get url of video component
			const videoBlock = block.Video.data.attributes.url;
			// create fuil url of the video
			const videoBlockURL = 'http://localhost:1337' + videoBlock;
			// add video url to the videoBlockURLs array
			videoBlockURLs.push(videoBlockURL);
		}
	});
	return (
		<div>
			{/* map function on post array to iterate over each blog post item */}

			{/* set unique key attribute to post item id */}
			<div key={post.id}>
				<div className={styles.container}>
					{/*<Image
						src={fullImageURL}
						alt={coverImageAlt}
						className={styles.container__coverImage}
						fill={true}
					/>*/}
					<img src={fullImageURL} alt="alt" height="200" width="300" />
				</div>
				<h1>{post.attributes.Title}</h1>
				<p>{post.attributes.Date}</p>
				<p>{post.attributes.Intro}</p>

				{/* Render the BlocksRenderer with the content from the post */}
				<CustomBlocksRenderer content={post.attributes.Content} />

				{/* create youtube embed url with video id */}
				{post.attributes.oembed && (
					<YouTubeVideo
						url={`https://www.youtube.com/embed/${youtubeVideoId}`}
						title={post.attributes.Title}
					/>
				)}

				{/* Iterate over the dynamicZone blocks */}
				{post.attributes.Blocks.map((block, index) => {
					// Switch based on the __component value of each block
					switch (block.__component) {
						case 'post.image-slider':
							return (
								<ImageSlider key={index} images={ImageSliderElements[index]} />
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
						// if there is a video block in the dynamic zone, render Video component
						case 'post.video':
							return <Video key={index} url={videoBlockURLs[index]} />;
						// Add cases for other components as needed
						default:
							return null;
					}
				})}
			</div>
		</div>
	);
}
