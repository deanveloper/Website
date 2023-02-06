import { LitElement, css, html } from '/lit.js';

export class Navbar extends LitElement {
	static properties = {
		currentPath: {},
		paths: { type: Object },
	}

	static styles = css`
		nav {
			position: sticky;
			top: 0px;
			height: 50px;
			z-index: 10;
		
			box-shadow: 0 0 10px black;
			background: var(--page-bg);
		}
		
		ul, li {
			list-style-type: none;
			margin: 0;
			padding: 0;
		}
		
		ul {
			display: flex;
			align-items: center;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: center;
		
			height: 100%;
		}
		
		li {
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
		
		a {
			display: flex;
			align-items: center;
			justify-content: center;
		
			width: 100%;
			height: 100%;
		
			color: var(--base-color-active);
			text-decoration: none;
		}
		
		li:hover,
		li:focus {
			outline: 0;
			border-bottom: 3px solid var(--base-color-almost);
		}
		
		li.navbar-item-exact {
			border-bottom: 3px solid var(--base-color-active);
		}
	`;

	anchors(paths) {
		return Object.entries(paths).map(([path, data]) => {
			if (this.currentPath === path) {
				return html`
					<li class="navbar-item-exact">
						<a href="${path}">${data.label}</a>
					</li>
				`;
			} else {
				return html`<li><a href="${path}">${data.label}</a></li>`;
			}
		});
	}

	render() {
		return html`
			<nav>
				<ul>
					${this.anchors(this.paths)}
				</ul>
			</nav>
		`
	}
}
customElements.define('nav-bar', Navbar);
