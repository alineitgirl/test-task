import { useEffect, useState } from "react";
import { CardListProps, LoadingStatus, Product } from "../types/index";
import { fetchCollectionById } from "../api/fetchCards";
import Card from "./Card";
import styles from '../styles/cardList.module.css';


export default function CardList({ collectionId, currentPage, onTotalPagesChange }: CardListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [status, setStatus]     = useState<LoadingStatus>('loading')
  const [error, setError]       = useState<string | null>(null)
  const itemsPerPage = 4

  useEffect(() => {
    setStatus('loading')
    setError(null)
    setProducts([])

    fetchCollectionById(collectionId)
      .then(data => {
        setProducts(data)
        onTotalPagesChange(Math.ceil(data.length / itemsPerPage))
        setStatus('success')
      })
      .catch((err: Error) => {
        setError(err.message)
        setStatus('error')
      })
  }, [collectionId, onTotalPagesChange])

  if (status === 'loading') {
    return <div className={styles.status}>Загрузка...</div>
  }

  if (status === 'error') {
    return <div className={styles.status}>Ошибка: {error}</div>
  }

  if (products.length === 0) {
    return <div className={styles.status}>Товары не найдены</div>
  }

  const startIdx = (currentPage - 1) * itemsPerPage
  const displayedProducts = products.slice(startIdx, startIdx + itemsPerPage)

  return (
    <div className={styles.slider}>
      {displayedProducts.map(product => (
        <Card key={product.id} {...product} />
      ))}
    </div>
  )
}