import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function Header() {
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

					{/* Cart icon */}
					<button className="relative hover:text-accent-500 transition-colors">
						<ShoppingCart size={24} />
					</button>
				</div>
			</div>
		</header>
	);
}

export default Header;
