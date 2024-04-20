import Link from 'next/link';
// import link button component
import LinkButton from '../linkButton/LinkButton';
// import styles
import styles from '../../styles/components/blogPostList/BlogPostList.module.scss';

export default function BlogPostList({
	imgSrc,
	imgAlt,
	date,
	day,
	title,
	slug,
}) {
	// split the date string into year, month, and day
	const [year, month, dayOfMonth] = date.split('-');
	// concatenate them in the desired format
	const formattedDate = `${dayOfMonth}.${month}.${year}`;
	return (
		<div className={styles.postListItem}>
			<Link href={`/posts/${slug}`} className={styles.postListItem__link}>
				<img src={imgSrc} alt={imgAlt} className={styles.postListImg} />
				<div className={styles.postListItem__date}>
					<p className={`${styles.p} ${styles['p--postList']}`}>
						{formattedDate}
					</p>
					<p className={`${styles.p} ${styles['p--postList']}`}>{day}</p>
				</div>
				<div className={styles.postListItem__container}>
					<h2 className={styles.h2}>{title}</h2>
				</div>
			</Link>
			<LinkButton
				link={`/posts/${slug}`}
				txt="Mehr erfahren"
				className={styles.postListItem__btn}
			/>
		</div>
	);
}
