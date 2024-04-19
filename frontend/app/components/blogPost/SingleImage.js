// import next.js image component
import Image from 'next/image';

export default function SingleImage({ imgSrc, imgAlt, imgCaption }) {
	// Image component not working in dev
	// <Image src={imgSrc} alt={imgAlt} width="500" height="400" />
	return (
		<figure>
			<img src={imgSrc} alt={imgAlt} width="500" height="400" />
			<figcaption>{imgCaption}</figcaption>
		</figure>
	);
}
