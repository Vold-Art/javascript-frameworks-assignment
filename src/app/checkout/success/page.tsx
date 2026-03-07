"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutSuccessPage() {
	const { clearCart } = useCart();

	useEffect(() => {
		clearCart();
	}, [clearCart]);

	return (
		<main className="p-6">
			<h1 className="text-2xl font-bold mb-4">Order successful</h1>
			<p className="mb-4">Thank you for your purchase.</p>

			<Link href="/" className="underline">
				Return to homepage
			</Link>
		</main>
	);
}
