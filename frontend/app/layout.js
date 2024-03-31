import { Inter } from 'next/font/google';
import './styles/main.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Reiseblog',
	description: 'Verfolge unsere Abenteuer',
};

/* next.js initial code
export default function RootLayout({ children }) {
  return (
    <html lang="de-CH">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
*/

const rootLayout = ({ children }) => (
	<html lang="de-CH">
		<body className={inter.className}>{children}</body>
	</html>
);

export default rootLayout;
