'use client';
// import BlocksRenderer component
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
// import main scss file
import '../../styles/globals.scss';
// import styles
import styles from '../../styles/components/blogPost/CustomBlocks.module.scss';
// import react hooks
import React, { useRef, useState, useEffect } from 'react';

// render the BlocksRenderer with the content from the post
export default function CustomBlocksRenderer({ content }) {
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
		<BlocksRenderer
			content={content}
			blocks={{
				paragraph: ({ children }) => (
					<p
						ref={elementRef} // attaches elementRef to observe it
						className={`p ${styles.txt} ${
							isVisible ? styles['txt--visible'] : ''
						}`}
					>
						{children}
					</p>
				),
				heading: ({ children, level }) => {
					switch (level) {
						case 1:
							return <h1 className="h1">{children}</h1>;
						case 2:
							return <h2 className="h2">{children}</h2>;
						case 3:
							return <h3 className="h3">{children}</h3>;
						case 4:
							return <h4 className="h4">{children}</h4>;
						case 5:
							return <h5 className="h5">{children}</h5>;
						case 6:
							return <h6 className="h6">{children}</h6>;
						default:
							return <h2 className="h2">{children}</h2>;
					}
				},
				list: ({ children, format }) => {
					switch (format) {
						case 'ordered':
							return <ol className="ol">{children}</ol>;
						case 'unordered':
							return <ul className="ul">{children}</ul>;
						default:
							return <h2 className="h2">{children}</h2>;
					}
				},
				link: ({ children, url }) => <a href={url}>{children}</a>,
			}}
		/>
	);
}
