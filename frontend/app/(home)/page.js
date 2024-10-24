import '../styles/globals.scss';
import BlogPostList from '../components/blogPostList/BlogPostList';
import LinkButton from '../components/linkButton/LinkButton';
// import styles
import styles from '../styles/components/linkButton/LinkButton.module.scss';
import blogStyles from '../styles/components/blogPostList/BlogPostList.module.scss';

// import arrow icon
import { FaArrowDownLong } from 'react-icons/fa6';

export async function generateStaticParams() {
	try {
		const response = await fetch(
			`https://peaceful-citadel-90180-369fa539b5ab.herokuapp.com/api/posts/`
		);
		if (!response.ok) {
			throw new Error('Failed to fetch posts');
		}
		const data = await response.json();
		return data.data.map((post) => ({
			params: {
				slug: String(post.attributes.slug),
			},
		}));
	} catch (error) {
		console.error('Error fetching posts:', error);
		return [];
	}
}

export default async function BlogPost({ params }) {
	const { slug } = params;
	console.log('slug:', slug);
	const response = await fetch(`
	https://peaceful-citadel-90180-369fa539b5ab.herokuapp.com/api/posts?sort=id:desc&pagination[page]=1&pagination[pageSize]=3&filter=&cacheBuster=${Date.now()}&populate[0]=CoverImage&populate[1]=CoverImage.url`);
	const postData = await response.json();
	console.log('post Data List:', postData);

	const post = postData.data;

	console.log('post antwort:', post);

	return (
		<div>
			<h1 className="h1 h1--home">NEUSTE ABENTEUER</h1>
			<div className={styles.arrowContainer}>
				<FaArrowDownLong color="#cdc1ff" className={styles.arrowDown} />
			</div>
			{post.map((item) => {
				// variable for cover image
				const coverImage = item.attributes.CoverImage;
				// variable for cover image url
				const coverImageUrl = coverImage.data.attributes.url;
				// variable for cover image alt text
				const coverImageAlt = coverImage.data.attributes.alternativeText;

				return (
					<div key={item.id} className={blogStyles.blogBostList}>
						<BlogPostList
							imgSrc={coverImageUrl}
							imgAlt={coverImageAlt}
							date={item.attributes.Date}
							day={item.attributes.Day}
							title={item.attributes.Title}
							slug={item.attributes.slug}
						/>
					</div>
				);
			})}
			<div className={styles.btnContainer}>
				<LinkButton
					link={`/posts/`}
					txt="Alle Beiträge"
					className={styles['btn--allPosts']}
				/>
			</div>
		</div>
	);
}
