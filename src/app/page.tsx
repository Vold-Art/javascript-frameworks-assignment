"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/api";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

export default function Home() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function load() {
			try {
				setLoading(true);
				setError(null);

				const data = await getProducts();
				setProducts(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Unknown error");
			} finally {
				setLoading(false);
			}
		}

		load();
	}, []);

	if (loading) return <main className="p-6">Loading…</main>;
	if (error) return <main className="p-6">Error: {error}</main>;

	return (
		<main className="p-6">
			<h1 className="text-2xl font-bold mb-4">Products</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</main>
	);
}
