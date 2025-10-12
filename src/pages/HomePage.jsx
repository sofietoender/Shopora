import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

function HomePage() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		async function fetchProducts() {
			try {
				const response = await fetch("https://v2.api.noroff.dev/online-shop");

				if (!response.ok) {
					throw new Error("Failed to fetch products");
				}

				const result = await response.json();
				setProducts(result.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		fetchProducts();
	}, []);

	const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<p className="text-center text-text-secondary">Loading products...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto px-4 py-8">
				<p className="text-center text-red-600">Error: {error}</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-text-primary mb-8">Our Products</h1>

			{/* SearchBar */}
			<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

			{/* Result message */}
			{searchQuery && (
				<p className="text-text-secondary mb-4">
					Found {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
				</p>
			)}

			{/* Product-grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{filteredProducts.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			{/* No results */}
			{filteredProducts.length === 0 && searchQuery && (
				<div className="text-center py-12">
					<p className="text-text-secondary text-lg">No products found for "{searchQuery}"</p>
				</div>
			)}
		</div>
	);
}

export default HomePage;
