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

export default function Header() {
	return (
		<header className={styles.header}>
			<Nav />
			<div className={styles.header__imageContainer}>
				<Image
					src={headerImage}
					alt="Illustration of map and airplane"
					className={styles.header__image}
				/>
			</div>
		</header>
	);
}
