import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

function Header() {
	const { getCartCount } = useCart();
	const cartCount = getCartCount();

	return (
		<header className="bg-primary text-white">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link to="/" className="text-2xl font-bold text-accent-500">
						Shopora
					</Link>

					{/* Navigation */}
					<nav>
						<ul className="flex gap-6">
							<li>
								<Link to="/" className="hover:text-accent-500 transition-colors">
									Home
								</Link>
							</li>
							<li>
								<Link to="/contact" className="hover:text-accent-500 transition-colors">
									Contact
								</Link>
							</li>
						</ul>
					</nav>

					{/* Cart icon with badge */}
					<Link to="/cart" className="relative hover:text-accent-500 transition-colors">
						<ShoppingCart size={24} />
						{cartCount > 0 && <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
					</Link>
				</div>
			</div>
		</header>
	);
}

export default Header;
