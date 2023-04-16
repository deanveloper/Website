import { LitElement, css, html } from '/lit.js';

export class PageNotFound extends LitElement {
	render() {
		return html`<div>lol page not found</div>`
	}
}
customElements.define('page-not-found', PageNotFound)