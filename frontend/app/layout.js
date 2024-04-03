import { Inter } from 'next/font/google';
import './styles/main.scss';

// import header
import Header from './components/header/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Reiseblog',
	description: 'Verfolge unsere Abenteuer',
};

export default function RootLayout({ children }) {
	return (
		<html lang="de-CH">
			<body className={inter.className}>
				<Header />
				{children}
			</body>
		</html>
	);
}
