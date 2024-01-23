import { authFetch } from "../api/auth";
import { getCsrfCookie } from "../utils/cookies";

export interface Category {
  id: number;
  category: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Beverage {
  id: number;
  name: string;
  abv: number;
  category: Category;
  brand: Brand;
}

interface PaginatedResults<Item> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Item[];
}

type PaginatedBeverages = PaginatedResults<Beverage>;
type PaginatedBrands = PaginatedResults<Brand>;

export async function queryBeverages(query: string) {
  // const url = new URL("http://localhost:8000/beverages/");
  const url = new URL("http://localhost:8000/api/beverages/");
  url.searchParams.set("q", query);
  const res = await authFetch(url, { credentials: "include" });
  const data: PaginatedBeverages = await res.json();
  // @ts-ignore
  if (data?.items) {
    // @ts-ignore
    data.results = data.items;
  }
  return data;
}

export async function createBeverage(
  name: string,
  abv: number,
  categoryId: number,
  brandId: number
) {
  const url = new URL("http://localhost:8000/api/beverages/");
  const res = await authFetch(url, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCsrfCookie()!,
    },
    body: JSON.stringify({
      name,
      abv,
      category_id: categoryId,
      brand_id: brandId,
    }),
  });
  return res;
}

export async function queryBrands(query: string) {
  // const url = new URL("http://localhost:8000/beverages/brands/");
  const url = new URL("http://localhost:8000/api/beverages/brands/");
  url.searchParams.set("q", query);
  const res = await authFetch(url, { credentials: "include" });
  const data: PaginatedBrands = await res.json();
  // @ts-ignore
  if (data?.items) {
    // @ts-ignore
    data.results = data.items;
  }
  return data;
}

export async function createBrand(brandName: string) {
  const url = new URL("http://localhost:8000/api/beverages/brands/");
  const res = await authFetch(url, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCsrfCookie()!,
    },
    body: JSON.stringify({ name: brandName }),
  });
  return res;
}

export async function getCategories() {
  const url = new URL("http://localhost:8000/api/beverages/categories/");
  const res = await authFetch(url, { credentials: "include" });
  const data = res.json();
  return data;
}
