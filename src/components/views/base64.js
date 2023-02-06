import { LitElement, css, html } from '/lit.js';

export class Base64 extends LitElement {
	static properties = {};

	static styles = css``

	render() {
		return html`
			<div class="page page-base64">
				<h1 class="header">base64 converter</h1>
				<div class="boxes">
					<TextBox value={text()} onInput={ev => setText(ev.target.value)}>
						<h2 class="subheader lowmargin">text</h2>
					</TextBox>
					<TextBox value={base64()} onInput={ev => setBase64(ev.target.value)}>
						<h2 class="subheader lowmargin">base64</h2>
					</TextBox>
				</div>
				<div class="error">{getErrorStr()}</div>
			</div>
		`
	}
}
customElements.define('base64-page', Base64);
