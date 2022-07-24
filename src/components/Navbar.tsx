import { createEffect } from 'solid-js';
import './Navbar.css';

export default function Navbar({ path }) {

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

	const anchors = links.map(link => (
		<li class={path === link.path ? 'navbar-item-exact' : undefined}>
			<a href={link.path}>{link.name}</a>
		</li>
	));

	return (
		<nav class="navbar">
			<ul>
				{anchors}
			</ul>
		</nav>
	);
}
