import type { Pagination } from "@/types/pagination";
import type { ProductDto } from "./product.dto";

type ProductQuery = {
  page?: number;
  size?: number;
  search?: string;
  categoryId?: string;
  genderId?: string;
  storeId?: string;
}

async function findAllProducts(queries: ProductQuery = {}): Promise<Pagination<ProductDto>> {
  const params = new URLSearchParams();
  if (queries.page) params.append('page', queries.page.toString());
  if (queries.size) params.append('size', queries.size.toString());
  if (queries.search) params.append('search', queries.search);
  if (queries.categoryId) params.append('categoryId', queries.categoryId);
  if (queries.genderId) params.append('genderId', queries.genderId);
  if (queries.storeId) params.append('storeId', queries.storeId);

  console.log({ params });
  return fetch(`${import.meta.env.VITE_API_URL}/guest/products?${params.toString()}`)
    .then(response => response.json())
    .then(dataPaginated => dataPaginated as Pagination<ProductDto>);
}

export { findAllProducts };
