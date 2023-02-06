import { LitElement, css, html } from '/lit.js';

const links = [
	{
		name: "about",
		path: "/",
	},
	{
		name: "base64",
		path: "/base64",
	}
];

export class Navbar extends LitElement {
	static properties = {
		path: {},
	}

	static styles = css`
		:host {
			position: sticky;
			top: 0px;
			height: 50px;
			z-index: 10;
		
			box-shadow: 0 0 10px black;
			background: var(--page-bg);
		}
		
		:host > ul,
		:host > ul > li {
			list-style-type: none;
			margin: 0;
			padding: 0;
		}
		
		:host > ul {
			display: flex;
			align-items: center;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: center;
		
			height: 100%;
		}
		
		:host > ul > li {
			box-sizing: border-box;
		
			display: flex;
			align-items: center;
			justify-content: center;
		
			position: relative;
			height: 100%;
			margin: 0 2px;
			font-size: 16px;
			width: 125px;
		
			color: var(--base-color-active);
		
			text-decoration: none;
		
			cursor: pointer;
			user-select: none;
		
			transition: border-bottom 0.25s;
			border-bottom: 3px solid var(--base-color-inactive);
		}
		
		:host > ul > li > a {
			display: flex;
			align-items: center;
			justify-content: center;
		
			width: 100%;
			height: 100%;
		
			color: var(--base-color-active);
			text-decoration: none;
		}
		
		:host > ul > li:hover,
		:host > ul > li:focus {
			outline: 0;
			border-bottom: 3px solid var(--base-color-almost);
		}
		
		:host > ul > li.navbar-item-exact {
			border-bottom: 3px solid var(--base-color-active);
		}
	`;

	anchors() {
		return links.map(link => {
			if (this.path === link.path) {
				return html`
					<li class="navbar-item-exact">
						${link.name}
					</li>
				`;
			} else {
				return html`<li>${link.name}</li>`;
			}
		});
	}

	render() {
		return html`
			<nav>
				<ul>
					${this.anchors()}
				</ul>
			</nav>
		`
	}
}
customElements.define('nav-bar', Navbar);
