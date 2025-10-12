import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
	const [cart, setCart] = useState([]);

	// Add product to cart
	const addToCart = (product) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((item) => item.id === product.id);

			if (existingItem) {
				return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
			}

			return [...prevCart, { ...product, quantity: 1 }];
		});
	};

	const removeFromCart = (productId) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
	};

	// Empty cart
	const clearCart = () => {
		setCart([]);
	};

	const getCartTotal = () => {
		return cart.reduce((total, item) => {
			return total + item.discountedPrice * item.quantity;
		}, 0);
	};

	const getCartCount = () => {
		return cart.reduce((count, item) => count + item.quantity, 0);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				clearCart,
				getCartTotal,
				getCartCount,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within CartProvider");
	}
	return context;
}
