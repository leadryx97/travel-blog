// import next.js image component
import Image from 'next/image';

export function ImageItem({ imgSrc, imgAlt, imgCaption }) {
	return (
		<figure>
			<Image src={imgSrc} alt={imgAlt} width="500" height="400" />
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
					imgSrc={'http://localhost:1337' + image.attributes.url}
					imgAlt={image.attributes.alternativeText}
					imgCaption={image.attributes.caption}
				/>
			))}
		</div>
	);
}
