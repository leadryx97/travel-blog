export default function YouTubeVideo({ url, title }) {
	return <iframe title={title} src={url} width="560" height="315" />;
}
