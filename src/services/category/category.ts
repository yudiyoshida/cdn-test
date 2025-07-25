import type { Pagination } from "@/types/pagination";
import type { CategoryDto } from "./category.dto";

async function findAllCategories(): Promise<CategoryDto[]> {
  return fetch(`${import.meta.env.VITE_API_URL}/guest/categories`)
    .then(response => response.json())
    .then(dataPaginated => dataPaginated as Pagination<CategoryDto>)
    .then(dataPaginated => dataPaginated.data);
}

export { findAllCategories };
