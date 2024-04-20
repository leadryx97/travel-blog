// import main scss file
import '../../../styles/main.scss';
// import google font
import { Roboto_Flex } from 'next/font/google';
// import header
import HeaderPage from '../../../components/header/HeaderPage';
// import footer
import Footer from '../../../components/footer/Footer';

// declare font variable
export const robotoFlex = Roboto_Flex({ subsets: ['latin'] });

// declare metadata
export const metadata = {
	title: 'Reiseblog',
	description: 'Verfolge unsere Abenteuer',
};

// root layout function
export default function RootLayout({ children }) {
	return (
		<html lang="de-CH">
			<body className={robotoFlex.className}>
				<HeaderPage title="BEITRÄGE" />
				{children}
				<Footer />
			</body>
		</html>
	);
}
