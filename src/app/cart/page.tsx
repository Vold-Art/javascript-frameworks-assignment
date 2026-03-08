"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function CartPage() {
	const {
		cart,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity,
		totalPrice,
	} = useCart();

	return (
		<main className="p-6">
			<h1 className="text-2xl font-bold mb-4">Cart</h1>

			{cart.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					<ul className="space-y-4">
						{cart.map((item) => (
							<li key={item.id} className="border p-4 rounded">
								<h2 className="font-semibold">{item.title}</h2>
								<div className="flex items-center gap-3 mt-2">
									<button
										onClick={() => decreaseQuantity(item.id)}
										className="border px-2 py-1 rounded"
									>
										-
									</button>

									<span>Quantity: {item.quantity}</span>

									<button
										onClick={() => increaseQuantity(item.id)}
										className="border px-2 py-1 rounded"
									>
										+
									</button>
								</div>
								<p>Price: ${item.discountedPrice ?? item.price}</p>

								<button
									onClick={() => {
										removeFromCart(item.id);
										toast.success("Item removed");
									}}
									className="mt-2 border px-3 py-1 rounded"
								>
									Remove
								</button>
							</li>
						))}
					</ul>

					<p className="mt-6 font-bold">Total: ${totalPrice.toFixed(2)}</p>

					<Link
						href="/checkout/success"
						className="inline-block mt-4 border px-4 py-2 rounded"
					>
						Checkout
					</Link>
				</>
			)}
		</main>
	);
}
