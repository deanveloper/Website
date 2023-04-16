import { listen } from '../nav.js';
import { LitElement, css, html } from '/lit.js';

const pages = {
	'/': {
		label: "About",
		elem: html`<home-page />`,
	},
	'/base64': {
		label: "Base 64",
		elem: html`<base64-page />`,
	},
	'/secret': {
		label: "hehehe",
		elem: html`<secret-page />`,
	}
}

export class Page extends LitElement {
	static properties = {
		_path: { state: true, type: String,  }
	}

	static styles = css`
		main {
			text-align: center;
		
			position: relative;
			margin: 0;
		
			font-family: Roboto, Arial, sans-serif;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			text-align: center;
			color: var(--default-text-color);
		
			width: 100%;
		}
		
		p {
			max-width: 14rem;
			margin: 2rem auto;
			line-height: 1.35;
		}
		
		@media (min-width: 480px) {
			h1 {
				max-width: none;
			}
		
			p {
				max-width: none;
			}
		}
		
		.page-container {
			padding: 75px 0px;
		}
		
		.background {
			position: absolute;
			top: 0;
			height: 100%;
			min-height: 100vh;
			width: 100%;
			overflow: hidden;
		
			user-select: none;
			z-index: -1;
		}
		
		.bg-text {
		
			width: 125%;
		
			background: var(--background-bg);
			color: var(--background-fg);
		
			font-family: mazeletter;
			text-align: left;
			font-size: 100px;
			line-height: 101px;
			font-weight: bold;
			word-break: break-all;
		}
	`;

	constructor() {
		super();
		this._path = window.location.pathname;
	}

	connectedCallback() {
		super.connectedCallback();
		listen((ev) => {
			this._path = window.location.pathname;
		});
	}

	render() {
		const bgText = "727WYSI".repeat(2000);
		return html`
			<div>
				<nav-bar .currentPath="${this._path}" .paths="${pages}"></nav-bar>
				<div aria-hidden="true" class="background">
					<div class="bg-text">${bgText}</div>
				</div>
				<main class="page-container">
					${pages[this._path].elem ?? html`<page-not-found />`}
				</main>
			</div>
		`
	}
}
customElements.define('dean-page', Page);
