
import { View } from './view.js';
import { css, html } from '/lit.js';

let luxon;

export class Secret extends View {
	static properties = {
		_duration: { state: true },
		_interval: { state: true },
	};
	static styles = [
		View.styles,
		css`
			.countdown-container {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: center;
				gap: 50px;

				margin-top: 50px;
			}

			.countdown-item {
				min-width: 50px;
				background: rgba(80, 255, 80, 0.1);
				border-radius: 10px;
				padding: 20px;
				margin: 0 20px;
			}

			.amount {
				display: block;
			}

			.unit {
				display: block;
			}
		
		`,
	];

	constructor() {
		super();

		this._duration = { days: 0, hours: 0, minutes: 0, seconds: 0 };
	}

	connectedCallback() {
		super.connectedCallback();

		if (!luxon) {
			import("https://cdn.jsdelivr.net/npm/luxon@3.3.0/+esm")
				.then((lib) => {
					luxon = lib;
				});
		}
		this._interval = setInterval(() => {
			this.updateDuration();
		}, 30);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		clearInterval(this._interval);
	}

	updateDuration() {
		if (luxon) {
			const { DateTime } = luxon;
			this._duration = DateTime.fromISO("2023-04-22T00:30:00", { zone: 'America/Phoenix' }).diffNow([ 'days', 'hours', 'minutes', 'seconds', 'milliseconds' ]).toObject();
		}
	}

	getDays() {}

	render() {
		return html`
			<div class="page">
				<h1 class="header">secret countdown</h1>

				<div class="countdown-container">
					<div class="countdown-item">
						<span class="amount">${this._duration.days}</span>
						<span class="unit">days</span>
					</div>
					<div class="countdown-item">
						<span class="amount">${this._duration.hours}</span>
						<span class="unit">hours</span>
					</div>
					<div class="countdown-item">
						<span class="amount">${this._duration.minutes}</span>
						<span class="unit">minutes</span>
					</div>
					<div class="countdown-item">
						<span class="amount">${this._duration.seconds}</span>
						<span class="unit">seconds</span>
					</div>
				</div>
			</div>
		`;
	}
}
customElements.define('secret-page', Secret);

