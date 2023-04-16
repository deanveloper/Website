import { View } from './view.js';
import { LitElement, css, html } from '/lit.js';

// converts UTF16 to bytes.
function utf16toBytes(str) {
	const codeUnits = new Uint16Array(str.length);
	for (let i = 0; i < codeUnits.length; i++) {
		codeUnits[i] = str.charCodeAt(i);
	}
	return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
}

// converts bytes to UTF16.
function bytesToUTF16(str) {
	const bytes = new Uint8Array(str.length);
	for (let i = 0; i < bytes.length; i++) {
		bytes[i] = str.charCodeAt(i);
	}
	return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

export class Base64 extends View {
	static properties = {
		_base64: { state: true },
		_error: { state: true },
	};

	static styles = [
		View.styles,
		css`
			.text-box-container {
				display: inline-block;
				color: var(--default-text-color);
			}
			
			.text-box-input {
				box-sizing: border-box;
			
				box-shadow: 3px 3px var(--trim-color);
				outline: 0;
			
				color: var(--default-text-color);
				background-color: var(--large-edit-component-bg);
			
				padding: 10px;
			
				border-radius: 10px;
				resize: none;
			
				width: 100%;
			}
		`,
	];

	constructor() {
		super();
		this._base64 = "";
		this._error = "";
	}

	render() {
		return html`
			<div class="page page-base64">
				<h1 class="header">base64 converter</h1>
				<div class="boxes">
					<div class="text-box-container">
						<div><h2 class="subheader lowmargin">text</h2></div>
						<textarea @input="${(ev) => this._setText(ev.target.value)}" .value="${this._text()}"></textarea>
					</div>
					<div class="text-box-container">
						<div><h2 class="subheader lowmargin">base64</h2></div>
						<textarea @input="${this._onBase64Input}" .value="${this._base64}"></textarea>
					</div>
				</div>
				<div class="error">${this._error}</div>
			</div>
		`
	}

	_onBase64Input(ev) {
		this._base64 = ev.target.value;
	}

	_text() {
		let bin;
		try {
			bin = atob(this._base64);
		} catch (err) {
			this._error = "invalid base64";
			return "";
		}

		let text;
		try {
			text = bytesToUTF16(bin);
			this._error = "";
		} catch (err) {
			this._error = err.message;
			return "";
		}
		return text;
	}

	_setText(val) {
		try {
			this._base64 = btoa(utf16toBytes(val));
			this._error = "";
		} catch (err) {
			this._error = err.message;
			this._base64 = "";
			return;
		}
	}
}
customElements.define('base64-page', Base64);
