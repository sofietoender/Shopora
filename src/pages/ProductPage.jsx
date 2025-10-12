import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductPage() {
	const { id } = useParams();
	const { addToCart } = useCart();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchProduct() {
			try {
				const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);

				if (!response.ok) {
					throw new Error("Product not found");
				}

				const result = await response.json();
				setProduct(result.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		fetchProduct();
	}, [id]);

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<p className="text-center text-text-secondary">Loading product...</p>
			</div>
		);
	}

	if (error || !product) {
		return (
			<div className="container mx-auto px-4 py-8">
				<p className="text-center text-red-600">Error: {error || "Product not found"}</p>
				<Link to="/" className="block text-center mt-4 text-accent-500 hover:text-accent-600">
					Back to store
				</Link>
			</div>
		);
	}

	const hasDiscount = product.price > product.discountedPrice;
	const discountPercentage = hasDiscount ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) : 0;

	return (
		<div className="container mx-auto px-4 py-8">
			<Link to="/" className="inline-block mb-6 text-accent-500 hover:text-accent-600 font-medium">
				← Back to store
			</Link>

			<div className="grid md:grid-cols-2 gap-8">
				<div className="bg-surface-alt rounded-lg overflow-hidden">
					<img src={product.image.url} alt={product.image.alt || product.title} className="w-full h-full object-cover" />
				</div>

				<div>
					<h1 className="text-4xl font-bold text-text-primary mb-4">{product.title}</h1>

					<p className="text-text-secondary mb-6">{product.description}</p>

					<div className="mb-6">
						{hasDiscount ? (
							<div>
								<div className="flex items-center gap-3 mb-2">
									<span className="text-4xl font-bold text-text-primary">{product.discountedPrice} kr</span>
									<span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold">-{discountPercentage}%</span>
								</div>
								<span className="text-xl text-text-muted line-through">{product.price} kr</span>
							</div>
						) : (
							<span className="text-4xl font-bold text-text-primary">{product.price} kr</span>
						)}
					</div>

					{/* Add to cart button */}
					<button onClick={() => addToCart(product)} className="w-full bg-accent-500 hover:bg-accent-600 text-white py-3 rounded-lg font-bold text-lg transition-colors">
						Add to cart
					</button>
				</div>
			</div>

			{/* Reviews */}
			{product.reviews && product.reviews.length > 0 && (
				<div className="mt-12">
					<h2 className="text-2xl font-bold text-text-primary mb-6">Reviews</h2>
					<div className="space-y-4">
						{product.reviews.map((review, index) => (
							<div key={index} className="bg-surface border border-border rounded-lg p-6">
								<div className="flex items-center gap-2 mb-2">
									<span className="font-semibold text-text-primary">{review.username}</span>
									<span className="text-accent-500">★ {review.rating}/5</span>
								</div>
								<p className="text-text-secondary">{review.description}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductPage;
