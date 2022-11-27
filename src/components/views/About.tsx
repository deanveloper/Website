import './About.css';

export default function About() {
	return (
		<div class="page page-about">
			<h1 class="header">dean bassett</h1>
			<h3 class="subheader">works at veeva systems</h3>
			<hr class="bar" />
			<section class="i-do games">
				you can find me playing{' '}
				<span class="game" title="Dean#13801">overwatch</span>,{' '}
				<span class="game" title="dean#dean">valorant</span>,{' '}
				<span class="game" title="deanveloper">osu!</span>, and{' '}
				<span class="game" title="deanveloper">minecraft</span>
			</section>
			<section class="i-do social">
				i also hang out on{' '}
				<a class="social-link" target="_blank" href="https://urusai.social/@dean" rel="me">mastodon</a>,{' '}
				<a class="social-link" target="_blank" href="https://www.tiktok.com/@deanveloper">tiktok</a>,{' '}
				<a class="social-link" target="_blank" href="https://instagram.com/deanveloper">instagram</a>,{' '}
				<a class="social-link" target="_blank" href="https://discord.gg/a9p7Jpm">discord</a>, and{' '}
				<a class="social-link" target="_blank" href="https://www.twitch.tv/deanveloper">twitch</a>
			</section>
			<section class="i-do other">
				oh and i guess here's my{' '}
				<a class="social-link" target="_blank" href="https://www.github.com/deanveloper">github</a>,{' '}
				<a class="social-link" target="_blank" href="mailto:dean@dbassett.dev">email</a>, and{' '}
				<a class="social-link" target="_blank" href="https://dev.to/dean">blog</a>
			</section>
		</div>
	);
}
