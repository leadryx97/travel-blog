// use client component
'use client';
// import styles
import styles from '../../styles/components/blogPost/SingleImage.module.scss';
// import react hooks
import React, { useRef, useState, useEffect } from 'react';

export default function SingleImage({ imgSrc, imgAlt, imgCaption }) {
	// defining visibility state for triggering animation on scroll
	const [isVisible, setIsVisible] = useState(false);
	// defining reference object for the element we want to observe
	const elementRef = useRef(null);

	// useEffect hook to set up intersection observer for scroll-triggered animations
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				// check if observed element is visible in the viewport
				if (entry.isIntersecting) {
					setIsVisible(true); // update state to make element visible
					observer.unobserve(elementRef.current); // stop observing after animation is triggered
				}
			},
			{ threshold: 0.2 } // trigger animation when 20% of element is visible
		);
		// start observing the element when component mounts
		if (elementRef.current) {
			observer.observe(elementRef.current);
		}
		// stop observing the element on component unmount or re-render
		return () => {
			if (elementRef.current) {
				observer.unobserve(elementRef.current);
			}
		};
	}, []); // empty dependency array ensures effect only runs once after initial render
	return (
		<figure
			ref={elementRef} // attaches elementRef to observe it
			className={`${styles.singleImg} ${
				isVisible ? styles['singleImg--visible'] : ''
			}`}
		>
			<img src={imgSrc} alt={imgAlt} className={styles.singleImg__item} />
			<figcaption>
				<p className={styles.singleImg__caption}>{imgCaption}</p>
			</figcaption>
		</figure>
	);
}
