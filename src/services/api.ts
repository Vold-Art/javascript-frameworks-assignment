import type { Product } from "@/types/product";

const BASE_URL = "https://v2.api.noroff.dev/online-shop";

function unwrap<T>(json: any): T {
	return (
		json && typeof json === "object" && "data" in json ? json.data : json
	) as T;
}

export async function getProducts(): Promise<Product[]> {
	const response = await fetch(BASE_URL, { cache: "no-store" });
	if (!response.ok) {
		throw new Error(`Failed to fetch products (${response.status})`);
	}

	const json = await response.json();
	return unwrap<Product[]>(json);
}

export async function getProductById(id: string): Promise<Product> {
	const url = `${BASE_URL}/${id}`;

	const response = await fetch(url, { cache: "no-store" });
	if (!response.ok) {
		throw new Error(`Failed to fetch product (${response.status}) from ${url}`);
	}

	const json = await response.json();
	return unwrap<Product>(json);
}
