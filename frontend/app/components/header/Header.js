// use client component
'use client';
// import styles
import styles from '../../styles/components/Header.module.scss';
// import next.js image component
import Image from 'next/image';
// import header image
import headerImage from '../../../public/header/header.webp';
// import navigation component
import Nav from './Navigation';
// import react hooks
import React, { useRef, useState, useEffect } from 'react';

export default function Header() {
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
		<header className={styles.header}>
			<Nav />
			<div className={styles.header__imageContainer}>
				<Image
					src={headerImage}
					alt="Illustration of map and airplane"
					ref={elementRef} // attaches elementRef to observe it
					className={`${styles.header__image} ${
						isVisible ? styles['header__image--visible'] : ''
					}`}
				/>
			</div>
		</header>
	);
}
