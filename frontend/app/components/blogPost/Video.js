export default function Video({ url }) {
	return (
		<video width="400" height="300" controls preload="auto">
			<source src={url} type="video/mp4" />
			{/* fallback message for browsers that don't support the video tag or fail to load the video */}
			<p>Dein Browser unterstützt den Video Tag nicht.</p>
		</video>
	);
}
