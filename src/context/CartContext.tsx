"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Product } from "@/types/product";
import type { CartItem } from "@/types/cart";

type CartContextType = {
	cart: CartItem[];
	addToCart: (product: Product) => void;
	removeFromCart: (id: string) => void;
	clearCart: () => void;
	cartCount: number;
	totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [cart, setCart] = useState<CartItem[]>([]);

	function addToCart(product: Product) {
		setCart((currentCart) => {
			const existingItem = currentCart.find((item) => item.id === product.id);

			if (existingItem) {
				return currentCart.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			}

			return [...currentCart, { ...product, quantity: 1 }];
		});
	}

	function removeFromCart(id: string) {
		setCart((currentCart) => currentCart.filter((item) => item.id !== id));
	}

	function clearCart() {
		setCart([]);
	}

	const cartCount = useMemo(
		() => cart.reduce((total, item) => total + item.quantity, 0),
		[cart],
	);

	const totalPrice = useMemo(
		() =>
			cart.reduce(
				(total, item) =>
					total + (item.discountedPrice ?? item.price) * item.quantity,
				0,
			),
		[cart],
	);

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				clearCart,
				cartCount,
				totalPrice,
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
