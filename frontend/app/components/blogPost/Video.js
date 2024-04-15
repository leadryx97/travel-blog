export default function Video({ url }) {
	return (
		<video width="400" height="300" controls preload="none">
			<source src={url} type="video/mp4" />
			Dein Browser unterstützt den Video Tag nicht.
		</video>
	);
}
