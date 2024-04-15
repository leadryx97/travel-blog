'use client';
// import BlocksRenderer component
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
// import main scss file
import '../../styles/globals.scss';

// Render the BlocksRenderer with the content from the post
export default function CustomBlocksRenderer({ content }) {
	return (
		<BlocksRenderer
			content={content}
			blocks={{
				paragraph: ({ children }) => <p className="p">{children}</p>,
				heading: ({ children, level }) => {
					switch (level) {
						case 1:
							return <h1 className="h1">{children}</h1>;
						case 2:
							return <h2 className="h2">{children}</h2>;
						case 3:
							return <h3 className="h3">{children}</h3>;
						case 4:
							return <h4 className="h4">{children}</h4>;
						case 5:
							return <h5 className="h5">{children}</h5>;
						case 6:
							return <h6 className="h6">{children}</h6>;
						default:
							return <h2 className="h2">{children}</h2>;
					}
				},
				list: ({ children, format }) => {
					switch (format) {
						case 'ordered':
							return <ol className="ol">{children}</ol>;
						case 'unordered':
							return <ul className="ul">{children}</ul>;
						default:
							return <h2 className="h2">{children}</h2>;
					}
				},
				link: ({ children, url }) => <a href={url}>{children}</a>,
			}}
		/>
	);
}
