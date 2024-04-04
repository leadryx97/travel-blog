import { Roboto_Flex, Playfair_Display } from 'next/font/google';
import './styles/main.scss';

// import header
import Header from './components/header/Header';

const robotoFlex = Roboto_Flex({ subsets: ['latin'] });
const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

export const metadata = {
	title: 'Reiseblog',
	description: 'Verfolge unsere Abenteuer',
};

export default function RootLayout({ children }) {
	return (
		<html lang="de-CH">
			<body className={robotoFlex.className}>
				<Header />
				{children}
			</body>
		</html>
	);
}
