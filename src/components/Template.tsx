import Navbar from './Navbar';
import './Template.css';

export default function Template({ path, Page }) {
	const bgText = "727WYSI".repeat(2000);

	return (
		<div>
			<Navbar path={path} />
			<div aria-hidden="true" class="background">
				<div class="bg-text">{bgText}</div>
			</div>
			<main class="page-container">
				<Page />
			</main>
		</div>
	);
}