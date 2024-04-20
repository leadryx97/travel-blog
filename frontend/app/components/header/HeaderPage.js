'use client';

// import styles for header
import styles from '../../styles/components/header/HeaderPage.module.scss';
// immport styles for h1
import '../../styles/globals.scss';
// import navigation component
import Nav from './Navigation';

export default function HeaderPages({ title }) {
	return (
		<header className={styles.headerPage}>
			<Nav />
			<h1 className={`h1 ${styles['h1--headerPage']}`}>{title}</h1>
		</header>
	);
}
