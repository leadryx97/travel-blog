// import styles
import styles from '../../styles/components/blogPost/Intro.module.scss';

export default function Intro({ title, date, day, intro }) {
	// split the date string into year, month, and day
	const [year, month, dayOfMonth] = date.split('-');
	// concatenate them in the desired format
	const formattedDate = `${dayOfMonth}.${month}.${year}`;
	return (
		<div className={styles.intro}>
			<h1 className={`${styles.h1} ${styles['h1--blogPost']}`}>{title}</h1>
			<div className={styles.intro__dateContainer}>
				<p>{formattedDate}</p>
				<p>{day}</p>
			</div>
			<p className={styles.intro__text}>{intro}</p>
		</div>
	);
}
