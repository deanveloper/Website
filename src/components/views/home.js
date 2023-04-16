import { View } from './view.js';
import { css, html } from '/lit.js';

export class Home extends View {
	static properties = {

	};
	static styles = [
		View.styles,
		css`
			:host {
				text-align: left;
			}
			
			.i-do {
				font-size: 32px;
				font-weight: 400;
				margin-top: 40px;
			}
			
			.game {
				cursor: default;
				color: var(--highlight-color);
			}
			
			.social-link {
				text-decoration: none;
			
				color: var(--highlight-color);
			}
			
			@media screen and (max-width: 670px) {
				.i-do {
					font-size: 20px;
					font-weight: 400;
					margin-top: 40px;
				}
			}
		`,
	];

	render() {
		return html`
			<div class="page">
				<h1 class="header">hi im dean</h1>
				<hr />
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
					<a class="social-link" target="_blank" href="mailto:deanvelopermn@gmail.com">email</a>, and
					<a class="social-link" target="_blank" href="https://dev.to/dean">blog</a>
				</section>
			</div>
		`;
	}
}
customElements.define('home-page', Home);
