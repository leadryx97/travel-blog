// import link react component
import Link from 'next/link';

export default function Header() {
	return (
		<header className="header">
			<nav className="nav">
				<ul>
					<li className="nav__item">
						<Link href="/">Home</Link>
					</li>
					<li className="nav__item">
						<Link href="/posts">Beiträge</Link>
					</li>
					<li className="nav__item">
						<Link href="/route">Route</Link>
					</li>
					<li className="nav__item">
						<Link href="/galerie">Galerie</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
