// use client component
'use client';
// import link react component
import Link from 'next/link';
// import link button component
import LinkButton from '../linkButton/LinkButton';
// import styles
import styles from '../../styles/components/blogPostList/BlogPostList.module.scss';
// import react hooks
import React, { useRef, useState, useEffect } from 'react';

export default function BlogPostList({
	imgSrc,
	imgAlt,
	date,
	day,
	title,
	slug,
}) {
	// defining visibility state for triggering animation on scroll
	const [isVisible, setIsVisible] = useState(false);
	// defining reference object for the element we want to observe
	const elementRef = useRef(null);
	// split the date string into year, month, and day
	const [year, month, dayOfMonth] = date.split('-');
	// format date string as dd.mm.yyyy
	const formattedDate = `${dayOfMonth}.${month}.${year}`;

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
		<div
			ref={elementRef} // attaches elementRef to observe it
			className={`${styles.postListItem} ${
				isVisible ? styles['postListItem--visible'] : ''
			}`}
		>
			<Link href={`/posts/${slug}`} className={styles.postListItem__link}>
				<img src={imgSrc} alt={imgAlt} className={styles.postListImg} />
				<div className={styles.postListItem__date}>
					<p className={`${styles.p} ${styles['p--postList']}`}>
						{formattedDate}
					</p>
					<p className={`${styles.p} ${styles['p--postList']}`}>{day}</p>
				</div>
				<div className={styles.postListItem__container}>
					<h2 className={styles.h2}>{title}</h2>
				</div>
			</Link>
			<LinkButton
				link={`/posts/${slug}`}
				txt="Mehr erfahren"
				className={styles.postListItem__btn}
			/>
		</div>
	);
}
