import type { Collection, Product } from "../types";

export async function fetchCollectionById(id: number) : Promise<Product[]> {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(BASE_URL);

    if (!res.ok) {
        throw new Error(`Ошибка сервера: ${res.status}`);
    }

    const data = await res.json();
    console.log('API Response:', data);

    let collections: Collection[] = [];
    
    if (data.data && Array.isArray(data.data)) {
        collections = data.data;
    } else {
        throw new Error(`Неожиданный формат ответа API`);
    }

    const found = collections.find(c => c.id === id);

    if (!found) {
        throw new Error(`Коллекция с id ${id} не найдена.`);
    }

    return found.data;
}