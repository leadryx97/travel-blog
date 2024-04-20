// import next.js image component
import Image from 'next/image';
// import styles
import styles from '../../styles/components/blogPost/SingleImage.module.scss';

export default function SingleImage({ imgSrc, imgAlt, imgCaption }) {
	// Image component not working in dev
	// <Image src={imgSrc} alt={imgAlt} width="500" height="400" />
	return (
		<figure className={styles.singleImg}>
			<img src={imgSrc} alt={imgAlt} className={styles.singleImg__item} />
			<figcaption>
				<p className={styles.singleImg__caption}>{imgCaption}</p>
			</figcaption>
		</figure>
	);
}
