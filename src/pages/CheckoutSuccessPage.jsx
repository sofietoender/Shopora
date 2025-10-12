import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CheckCircle } from "lucide-react";

function CheckoutSuccessPage() {
	const { clearCart } = useCart();

	useEffect(() => {
		clearCart();
	}, []);

	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-md mx-auto text-center">
				{/* Success icon */}
				<div className="mb-6 flex justify-center">
					<div className="bg-success-500 rounded-full p-4">
						<CheckCircle size={64} className="text-white" />
					</div>
				</div>

				{/* Success message */}
				<h1 className="text-3xl font-bold text-text-primary mb-4">Order Successful!</h1>
				<p className="text-text-secondary mb-8">Thank you for your purchase. Your order has been confirmed and will be shipped soon.</p>

				{/* Back to store button */}
				<Link to="/" className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-bold transition-colors">
					Back to Store
				</Link>
			</div>
		</div>
	);
}

export default CheckoutSuccessPage;
