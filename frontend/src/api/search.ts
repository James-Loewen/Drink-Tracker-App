import { authFetch } from "../api/auth";

interface Category {
  id: number;
  category: string;
}

interface Brand {
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
  const url = new URL("http://localhost:8000/beverages/");
  // const url = new URL("http://localhost:8000/api/beverages/");
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

export async function queryBrands(query: string) {
  const url = new URL("http://localhost:8000/beverages/brands/");
  url.searchParams.set("q", query);
  const res = await authFetch(url, { credentials: "include" });
  const data: PaginatedBrands = await res.json();
  return data;
}
