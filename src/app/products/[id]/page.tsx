import { getProductById, getProducts } from "@/services/api";
import AddToCartButton from "@/components/AddToCartButton";

type PageProps = {
	params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
	const products = await getProducts();

	return products.map((product) => ({
		id: product.id,
	}));
}

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

			<AddToCartButton product={product} />

			{product.tags && product.tags.length > 0 && (
				<div className="mt-6">
					<h2 className="text-xl font-semibold mb-2">Tags</h2>
					<div className="flex flex-wrap gap-2">
						{product.tags.map((tag) => (
							<span key={tag} className="border px-2 py-1 rounded text-sm">
								{tag}
							</span>
						))}
					</div>
				</div>
			)}

			{product.reviews && product.reviews.length > 0 && (
				<div className="mt-6">
					<h2 className="text-xl font-semibold mb-2">Reviews</h2>

					<div className="space-y-3">
						{product.reviews.map((review) => (
							<div key={review.id} className="border p-3 rounded">
								<p className="font-semibold">{review.username}</p>
								<p>Rating: {review.rating}</p>
								<p>{review.description}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</main>
	);
}
