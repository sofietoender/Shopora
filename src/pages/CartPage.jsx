import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2 } from "lucide-react";

function CartPage() {
	const { cart, removeFromCart, getCartTotal } = useCart();
	const navigate = useNavigate();

	if (cart.length === 0) {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold text-text-primary mb-8">Shopping Cart</h1>
				<div className="text-center py-12">
					<p className="text-text-secondary text-lg mb-4">Your cart is empty</p>
					<Link to="/" className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
						Continue shopping
					</Link>
				</div>
			</div>
		);
	}

	const handleCheckout = () => {
		navigate("/checkout-success");
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-text-primary mb-8">Shopping Cart</h1>

			<div className="grid lg:grid-cols-3 gap-8">
				{/* Cart items */}
				<div className="lg:col-span-2 space-y-4">
					{cart.map((item) => (
						<div key={item.id} className="bg-surface border border-border rounded-lg p-4 flex gap-4">
							<img src={item.image.url} alt={item.title} className="w-24 h-24 object-cover rounded" />

							<div className="flex-grow">
								<h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
								<div className="flex items-center gap-4">
									<p className="text-text-secondary text-sm">Qty: {item.quantity}</p>
									<p className="font-bold text-text-primary">{item.discountedPrice} kr</p>
								</div>
							</div>

							<button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition-colors self-start" title="Remove from cart">
								<Trash2 size={20} />
							</button>
						</div>
					))}
				</div>

				<div className="lg:col-span-1">
					<div className="bg-surface border border-border rounded-lg p-6 sticky top-4">
						<h2 className="text-xl font-bold text-text-primary mb-4">Order Summary</h2>

						<div className="space-y-2 mb-4">
							<div className="flex justify-between text-text-secondary">
								<span>Subtotal</span>
								<span>{getCartTotal().toFixed(2)} kr</span>
							</div>
							<div className="flex justify-between text-text-secondary">
								<span>Shipping</span>
								<span>Free</span>
							</div>
						</div>

						<div className="border-t border-border pt-4 mb-6">
							<div className="flex justify-between text-lg font-bold text-text-primary">
								<span>Total</span>
								<span>{getCartTotal().toFixed(2)} kr</span>
							</div>
						</div>

						<button onClick={handleCheckout} className="w-full bg-accent-500 hover:bg-accent-600 text-white py-3 rounded-lg font-bold transition-colors">
							Checkout
						</button>

						<Link to="/" className="block text-center text-accent-500 hover:text-accent-600 mt-4 font-medium">
							Continue shopping
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartPage;
