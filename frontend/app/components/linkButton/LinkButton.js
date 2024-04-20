// import styles
import styles from '../../styles/components/linkButton/LinkButton.module.scss';

export default function Button({ link, txt, className }) {
	return (
		<>
			<a className={`${styles.btn} ${className}`} href={link}>
				{txt}
			</a>
		</>
	);
}
