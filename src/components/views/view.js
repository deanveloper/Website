import { LitElement, css, html } from '/lit.js';

export class View extends LitElement {
	static styles = css`
		
		.header {
			margin: 0;
			color: var(--base-color);
			font-size: 80px;

			font-family: Recursive, Helvetica, sans-serif;
		}

		.subheader {
			margin-top: 0;
			color: var(--subheader-color);
		}
		
		hr {
			border: 0;
			border-bottom: 1px solid grey;
		}
		
		.page {
			max-width: 90%;
			width: 1000px;
			margin: auto;
		
			box-sizing: border-box;
			padding: 30px;
		
			background-color: var(--page-bg);
		}

		@media screen and (max-width: 670px) {
			.header {
				margin: 0;
				color: var(--base-color);
				font-size: 50px;
			}
		}
	`
}
