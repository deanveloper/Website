import { LitElement, css, html } from '/lit.js';

export class Home extends LitElement {
	static properties = {

	}
	static styles = css`
		:host {
			text-align: left;
		}
		
		.header {
			margin: 0;
			color: var(--base-color);
			font-size: 80px;
		
			transition: font-size 0.25s;
		}
		
		.bar {
			border: 0;
			border-bottom: 1px solid grey;
		}
		
		.i-do {
			font-size: 32px;
			font-weight: 400;
			margin-top: 40px;
		
			transition: font-size 0.25s;
		}
		
		.game {
			cursor: default;
			color: var(--highlight-color);
		}
		
		.social-link {
			text-decoration: none;
		
			color: var(--highlight-color);
		}
		
		@media screen and (prefers-reduced-motion: reduce) {
			.header {
				transition: none;
			}
		
			.i-do {
				transition: none;
			}
		}
		
		@media screen and (max-width: 670px) {
			.header {
				margin: 0;
				color: var(--base-color);
				font-size: 50px;
			}
		
			.i-do {
				font-size: 20px;
				font-weight: 400;
				margin-top: 40px;
			}
		}
	`;

	render() {
		return html`
			<div>
				<h1 class="header">dean bassett</h1>
				<h3 class="subheader">works at veeva systems</h3>
				<hr class="bar" />
				<section class="i-do games">
					you can find me playing
					<span class="game" title="Dean#13801">overwatch</span>,
					<span class="game" title="dean#dean">valorant</span>,
					<span class="game" title="deanveloper">osu!</span>, and
					<span class="game" title="deanveloper">minecraft</span>
				</section>
				<section class="i-do social">
					i also hang out on
					<a class="social-link" target="_blank" href="https://urusai.social/@dean" rel="me">mastodon</a>,
					<a class="social-link" target="_blank" href="https://www.tiktok.com/@deanveloper">tiktok</a>,
					<a class="social-link" target="_blank" href="https://instagram.com/deanveloper">instagram</a>,
					<a class="social-link" target="_blank" href="https://discord.gg/a9p7Jpm">discord</a>, and
					<a class="social-link" target="_blank" href="https://www.twitch.tv/deanveloper">twitch</a>
				</section>
				<section class="i-do other">
					oh and i guess here's my
					<a class="social-link" target="_blank" href="https://www.github.com/deanveloper">github</a>,
					<a class="social-link" target="_blank" href="mailto:dean@dbassett.dev">email</a>, and
					<a class="social-link" target="_blank" href="https://dev.to/dean">blog</a>
				</section>
			</div>
		`
	}
}
customElements.define('home-page', Home);
