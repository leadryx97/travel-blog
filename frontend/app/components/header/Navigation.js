'use client';

// import link react component
import Link from 'next/link';
// import styles
import styles from '../../styles/components/Header.module.scss';
// import hamburger icon
import { HiMenuAlt2 } from 'react-icons/hi';
// import close icon
import { IoClose } from 'react-icons/io5';
// import useState
import { useState } from 'react';

export default function Nav() {
	const [nav, setNav] = useState(false);
	return (
		<>
			<nav className={styles.nav}>
				<div className={styles.hamburger}>
					<button onClick={() => setNav(!nav)}>
						{nav ? (
							<IoClose
								color="#7371fc"
								className={styles.hamburger__iconClosed}
							/>
						) : (
							<HiMenuAlt2 color="#7371fc" className={styles.hamburger__icon} />
						)}
					</button>
				</div>
				<div
					className={`${
						nav ? styles.nav__container : styles.nav__containerHidden
					}`}
				>
					<ul className={styles.nav__menu}>
						<li className={styles.nav__item}>
							<Link
								href="/"
								onClick={() => setNav(!nav)}
								className={styles.nav__link}
							>
								Home
							</Link>
						</li>
						<li className={styles.nav__item}>
							<Link
								href="/posts"
								onClick={() => setNav(!nav)}
								className={styles.nav__link}
							>
								Beiträge
							</Link>
						</li>
						<li className={styles.nav__item}>
							<Link
								href="/route"
								onClick={() => setNav(!nav)}
								className={styles.nav__link}
							>
								Route
							</Link>
						</li>
						<li className={styles.nav__item}>
							<Link
								href="/galerie"
								onClick={() => setNav(!nav)}
								className={styles.nav__link}
							>
								Galerie
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}
