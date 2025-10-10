import "./index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
	return <div className="bg-primary text-accent-50 p-8">Hjem-side ✓</div>;
}

function About() {
	return <div className="bg-primary text-accent-50 p-8">Om-side ✓</div>;
}

function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen bg-primary">
				<nav className="p-4 flex gap-4 bg-gray-800">
					<Link to="/" className="text-accent-50 underline">
						Hjem
					</Link>
					<Link to="/about" className="text-accent-50 underline">
						Om
					</Link>
				</nav>

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
