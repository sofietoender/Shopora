import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<main className="min-h-screen bg-background">
				<Routes>
					<Route
						path="/"
						element={
							<div className="container mx-auto px-4 py-8">
								<h1 className="text-3xl font-bold text-text-primary">Homepage</h1>
							</div>
						}
					/>
					<Route
						path="/contact"
						element={
							<div className="container mx-auto px-4 py-8">
								<h1 className="text-3xl font-bold text-text-primary">Contact Page</h1>
							</div>
						}
					/>
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
