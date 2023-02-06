

export function pushState(state, url) {
	window.history.pushState(state, undefined, url);
	const stateEvent = new CustomEvent('pushstate', { state });
	window.dispatchEvent(stateEvent);
}

export function replaceState(state, url) {
	window.history.replaceState(state, undefined, url);
	const stateEvent = new Event('replacestate', { state });
	window.dispatchEvent(stateEvent);
}

export function listen(handler) {
	const onChange = (ev) => {
		handler(ev);
	};
	window.addEventListener('popstate', onChange);
	window.addEventListener('replacestate', onChange);
	window.addEventListener('pushstate', onChange);

	return () => {
		window.removeEventListener('popstate', onChange);
		window.removeEventListener('replacestate', onChange);
		window.removeEventListener('pushstate', onChange);
	}
}