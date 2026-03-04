import type { Product } from "@/types/product";

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	return (
		<div className="border p-4 rounded">
			<img
				src={product.image.url}
				alt={product.image.alt || product.title}
				className="mb-2"
			/>

			<h2 className="font-semibold">{product.title}</h2>

			{product.discountedPrice ? (
				<p>
					Price: ${product.discountedPrice}{" "}
					<span className="line-through text-gray-500">${product.price}</span>
				</p>
			) : (
				<p>Price: ${product.price}</p>
			)}

			<p>Rating: {product.rating}</p>
		</div>
	);
}
