// import styles
import styles from '../../styles/components/Intro.module.scss';

export default function Intro({ title, date, intro }) {
	return (
		<div className={styles.introContainer}>
			<h1 className={`${styles.h1} ${styles['h1--blogPost']}`}>{title}</h1>
			<p>{date}</p>
			<p>{intro}</p>
		</div>
	);
}
