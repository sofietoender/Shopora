import { Link } from "react-router-dom";

function ProductCard({ product }) {
	// Check if discount
	const hasDiscount = product.price > product.discountedPrice;
	const discountPercentage = hasDiscount ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) : 0;

	return (
		<div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
			{/* Product image */}
			<div className="relative aspect-square bg-surface-alt">
				<img src={product.image.url} alt={product.image.alt || product.title} className="w-full h-full object-cover" />

				{/* discount-badge */}
				{hasDiscount && <div className="absolute top-2 right-2 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold">-{discountPercentage}%</div>}
			</div>

			{/* Product info */}
			<div className="p-4">
				<h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">{product.title}</h3>

				{/* Price */}
				<div className="mb-4">
					{hasDiscount ? (
						<div className="flex items-center gap-2">
							<span className="text-2xl font-bold text-text-primary">{product.discountedPrice} kr</span>
							<span className="text-sm text-text-muted line-through">{product.price} kr</span>
						</div>
					) : (
						<span className="text-2xl font-bold text-text-primary">{product.price} kr</span>
					)}
				</div>

				{/* View product button */}
				<Link to={`/product/${product.id}`} className="block w-full bg-accent-500 hover:bg-accent-600 text-white text-center py-2 rounded-lg transition-colors font-medium">
					View product
				</Link>
			</div>
		</div>
	);
}

export default ProductCard;
