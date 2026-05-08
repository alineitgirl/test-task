import type { Collection, Product } from "../types";

export async function fetchCollectionById(id: number): Promise<Product[]> {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error(`Ошибка сервера: ${res.status}`);
  }

  const data = await res.json();

  if (!data.data || !Array.isArray(data.data)) {
    throw new Error(`Неожиданный формат ответа API`);
  }

  const collections: Collection[] = data.data;
  const found = collections.find(c => c.id === id);

  if (!found) {
    throw new Error(`Коллекция с id ${id} не найдена.`);
  }

  return found.data;
}