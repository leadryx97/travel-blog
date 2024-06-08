// use client component
'use client';
// import next.js image component
import Image from 'next/image';
// import arrow next
import { FaArrowRightLong } from 'react-icons/fa6';
// import arrow prev
import { FaArrowLeftLong } from 'react-icons/fa6';
// import react slick slider
import Slider from 'react-slick';
// import styles for react slick slider
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
// import styles
import styles from '../../styles/components/blogPost/ImageSlider.module.scss';

export function ImageItem({ imgSrc, imgAlt, imgCaption }) {
	// Find the index of the version segment
	const versionIndex = imgSrc.lastIndexOf('/v');

	// Extract the base URL and the version segment
	const baseUrl = imgSrc.substring(0, versionIndex);
	const versionSegment = imgSrc.substring(versionIndex);

	// Construct the optimized URL by inserting optimization parameters before the version segment
	const optimizedImgSrc = `${baseUrl}/q_auto,f_auto${versionSegment}`;

	console.log('Original SRC:', imgSrc);
	console.log('Optimized SRC:', optimizedImgSrc);

	// Image component not working in dev
	// <Image src={imgSrc} alt={imgAlt} width="500" height="400" />
	return (
		<figure className={styles.ImageSlider}>
			<img
				src={optimizedImgSrc}
				alt={imgAlt}
				className={styles.ImageSlider__item}
			/>
			<figcaption className={styles.ImageSlider__caption}>
				<p>{imgCaption}</p>
			</figcaption>
		</figure>
	);
}

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	const customClassName = `${className} ${styles.imageSliderArrowNext}`;
	return (
		<FaArrowRightLong
			className={customClassName}
			style={{}}
			onClick={onClick}
		/>
	);
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	const customClassName = `${className} ${styles.imageSliderArrowPrev}`;
	return (
		<FaArrowLeftLong
			className={customClassName}
			style={{
				...style,
				left: '0',
				color: 'white',
				padding: '0 10px',
				display: 'none',
			}}
			onClick={onClick}
		/>
	);
}

export default function ImageSlider({ images }) {
	// settings for react slick slider
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
		//autoplay: true,
		//autoplaySpeed: 7000,
		//pauseOnHover: true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	return (
		<div className="imageSlider">
			<Slider {...settings}>
				{images.map((image, index) => (
					<ImageItem
						key={index}
						imgSrc={image.attributes.url}
						imgAlt={image.attributes.alternativeText}
						imgCaption={image.attributes.caption}
					/>
				))}
			</Slider>
		</div>
	);
}
