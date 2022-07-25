import { createSignal } from 'solid-js';


function TextBox({ children, value, onInput }) {
	return (
		<div class="text-box-container">
			<div>{children}</div>
			<textarea onInput={onInput}>{value()}</textarea>
		</div>
	);
}

// converts UTF16 to bytes.
function utf16toBytes(str: string): string {
	const codeUnits = new Uint16Array(str.length);
	for (let i = 0; i < codeUnits.length; i++) {
		codeUnits[i] = str.charCodeAt(i);
	}
	return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
}

// converts bytes to UTF16.
function bytesToUTF16(str: string): string {
	const bytes = new Uint8Array(str.length);
	for (let i = 0; i < bytes.length; i++) {
		bytes[i] = str.charCodeAt(i);
	}
	return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

export default function Base64() {
	const [base64, setBase64] = createSignal("");
	const [error, setError] = createSignal("");


	function text() {
		let bin: string;
		try {
			bin = atob(base64());
		} catch (err) {
			setError("invalid base64");
			return "";
		}

		let text: string;
		try {
			text = bytesToUTF16(bin);
		} catch (err) {
			setError(err.message);
			return "";
		}
		setError("");
		return text;
	}
	function setText(val) {
		try {
			setBase64(btoa(utf16toBytes(val)));
		} catch (err) {
			setError(err.message);
			setBase64("");
			return;
		}
		setError("");
	}

	function getErrorStr() {
		const disappoint = String.fromCodePoint(0x1f61e);
		return error() ? `${disappoint} ${error()} ${disappoint}` : "";
	}

	return (
		<div class="page page-base64">
			<h1 class="header">base64 converter</h1>
			<div class="boxes">
				<TextBox value={text} onInput={ev => setText(ev.target.value)}>
					<h2 class="subheader lowmargin">text</h2>
				</TextBox>
				<TextBox value={base64} onInput={ev => setBase64(ev.target.value)}>
					<h2 class="subheader lowmargin">base64</h2>
				</TextBox>
			</div>
			<div class="error">{getErrorStr()}</div>
		</div>
	);
}
