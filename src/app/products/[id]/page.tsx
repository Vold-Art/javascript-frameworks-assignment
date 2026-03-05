import { getProductById } from "@/services/api";

type PageProps = {
	params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: PageProps) {
	const { id } = await params;

	const product = await getProductById(id);

	return (
		<main className="p-6 max-w-2xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">{product.title}</h1>

			<img
				src={product.image.url}
				alt={product.image.alt || product.title}
				className="mb-4 rounded"
			/>

			<p className="mb-4">{product.description}</p>

			<p className="mb-2">
				Price:{" "}
				{product.discountedPrice ? (
					<>
						${product.discountedPrice}{" "}
						<span className="line-through text-gray-500">${product.price}</span>
					</>
				) : (
					`$${product.price}`
				)}
			</p>

			<p>Rating: {product.rating}</p>
		</main>
	);
}
