import "./index.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route
					index
					element={
						<div className="container mx-auto px-4 py-8">
							<h1 className="text-3xl font-bold text-text-primary">Homepage</h1>
						</div>
					}
				/>
				<Route
					path="contact"
					element={
						<div className="container mx-auto px-4 py-8">
							<h1 className="text-3xl font-bold text-text-primary">Contact Page</h1>
						</div>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
