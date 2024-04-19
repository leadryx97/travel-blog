// import next.js image component
import Image from 'next/image';

export function ImageItem({ imgSrc, imgAlt, imgCaption }) {
	// Image component not working in dev
	// <Image src={imgSrc} alt={imgAlt} width="500" height="400" />
	return (
		<figure>
			<img src={imgSrc} alt={imgAlt} width="300" height="200" />

			<figcaption>{imgCaption}</figcaption>
		</figure>
	);
}

export default function ImageSlider({ images }) {
	return (
		<div className="imageSlider">
			{images.map((image, index) => (
				<ImageItem
					key={index}
					imgSrc={'http://127.0.0.1:1337' + image.attributes.url}
					imgAlt={image.attributes.alternativeText}
					imgCaption={image.attributes.caption}
				/>
			))}
		</div>
	);
}
