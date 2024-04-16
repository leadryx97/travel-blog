'use client';

// import styles
import styles from '../../styles/components/Header.module.scss';
// import navigation component
import Nav from './Navigation';

export default function HeaderSinglePost({ CoverImage, CoverImageAlt }) {
	return (
		<header className={styles.headerSinglePost}>
			<Nav />
		</header>
	);
}
