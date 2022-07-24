import Navbar from './Navbar';
import './Template.css';
import About from './views/About';

export default function Template({ path, Page }) {
	const bgText = "727WYSI".repeat(2000);

	return (
		< div >
			<Navbar path={path} />
			<div class="background">
				<div class="bg-text">{bgText}</div>
			</div>
			<main class="page-container">
				<Page />
			</main>
		</div>
	);
}