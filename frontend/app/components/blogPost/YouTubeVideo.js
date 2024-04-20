// import styles
import styles from '../../styles/components/blogPost/YouTubeVideo.module.scss';

export default function YouTubeVideo({ url, title }) {
	return (
		<div className={styles.youTubeContainer}>
			<iframe title={title} src={url} className={styles.youtubeVideo} />;
		</div>
	);
}
