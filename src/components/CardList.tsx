import { useEffect, useState } from "react";
import { CardListProps, Product } from "../types/index";
import { fetchCollectionById } from "../api/fetchCards";
import Card from "./Card";
import styles from '../styles/cardList.module.css';


export default function CardList({collectionId, currentPage, onTotalPagesChange} : CardListProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const itemsPerPage = 4;

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchCollectionById(collectionId)
        .then(data => {
            console.log('Loaded products:', data);
            setProducts(data);
            const totalPages = Math.ceil(data.length / itemsPerPage);
            onTotalPagesChange(totalPages);
            setLoading(false);
        })
        .catch((err: Error) => {
            console.error('Error loading collection:', err);
            setError(err.message);
            setLoading(false);
        })
    }, [collectionId, onTotalPagesChange]);

    if (loading) {
        return <div className={styles.status}>Загрузка...</div>;
    }

    if (error) {
        return <div className={styles.status}>Ошибка: {error}</div>;
    }

    if (products.length === 0) {
        return <div className={styles.status}>Товары не найдены</div>;
    }

    const startIdx = (currentPage - 1) * itemsPerPage;
    const displayedProducts = products.slice(startIdx, startIdx + itemsPerPage);

   return (
    <div className={styles.slider}>
        {displayedProducts.map(product => (
            <Card key={product.id} {...product}/>
        ))}
    </div>
   )
}