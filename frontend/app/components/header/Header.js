// import link react component
import Link from 'next/link';
// import styles
import styles from '../../styles/components/Header.module.scss';

export default function Header() {
	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<ul className={styles.nav__menu}>
					<li className={styles.nav__item}>
						<Link href="/" className={styles.nav__link}>
							Home
						</Link>
					</li>
					<li className={styles.nav__item}>
						<Link href="/posts" className={styles.nav__link}>
							Beiträge
						</Link>
					</li>
					<li className={styles.nav__item}>
						<Link href="/route" className={styles.nav__link}>
							Route
						</Link>
					</li>
					<li className={styles.nav__item}>
						<Link href="/galerie" className={styles.nav__link}>
							Galerie
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
