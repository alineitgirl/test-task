import CardList from './components/CardList';
import styles from './styles/widget.module.css'
import { useState } from 'react';
import backIcon from "./assets/back-icon.png";
import forwardIcon from "./assets/forward-icon.png";
import { WidgetProps } from './types';


export default function Widget({ collectionId = Number(import.meta.env.VITE_PRODUCT_URL) }: WidgetProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePrev = () => {
        setCurrentPage(prev => Math.max(1, prev - 1));
    };

    const handleNext = () => {
        setCurrentPage(prev => Math.min(totalPages, prev + 1));
    };

    return (
        <div className={styles.widgetRoot}>
            <div className={styles.sectionContainer}>
                <p className={styles.sectionName}>Новинки</p>
                <div className={styles.controls}>
                    <button 
                        className={styles.button} 
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        aria-label="Предыдущая страница"
                    >
                        <img
                        src={backIcon}
                        alt='Назад'
                        className={styles.backIcon}/>
                    </button>
                    <span className={styles.pagination}>{currentPage}/{totalPages}</span>
                    <button 
                        className={styles.button}
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        aria-label="Следующая страница"
                    >
                        <img
                        src={forwardIcon}
                        alt='Вперёд'
                        className={styles.forwardIcon}/>
                    </button>
                </div>
            </div>
            <CardList 
                collectionId={collectionId} 
                currentPage={currentPage}
                onTotalPagesChange={setTotalPages}
            />
        </div>
    )
}