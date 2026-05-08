import type { Product } from "../types";
import styles from "../styles/card.module.css";
import { useState } from "react";
import clsx from "clsx";
import shopIcon from "../assets/shop-icon.png";
import inStock from "../assets/in-stock.png";
import lowStock from "../assets/low-stock.png";
import outOfStock from "../assets/out-of-stock.png";
import favoriteIcon from "../assets/favorite-icon.png";
import comparisonIcon from "../assets/comparison-icon.png"

const STOCK_LABELS: Record<string, { label: string; color: string, icon : string }> = {
  IN_STOCK: { label: "В наличии", color: "var(--primary-green)", icon: inStock },
  LOW_STOCK: { label: "Мало", color: "var(--primary-orange)", icon: lowStock},
  OUT_OF_STOCK: { label: "Нет в наличии", color: "var(--primary-red)", icon: outOfStock },
};

export default function Card({
  name,
  slug,
  category_name,
  price,
  old_price,
  credit_text,
  stock_status,
  preview_image,
  tags,
}: Product) {

  const PRODUCT_URL = import.meta.env.VITE_PRODUCT_URL;

  const hasDiscount = old_price !== null && old_price > price;
  const stock = STOCK_LABELS[stock_status];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className={styles.card}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a href={`${PRODUCT_URL}/${slug}`}>
          <div className={styles.imageContainer}>
            <img src={preview_image} alt={name} className={styles.image} />
            <div className={styles.badgeContainer}>
              {tags.length > 0 && (
                <div className={styles.tagContainer}>
                  {tags.map((tag) => (
                    <div
                      className={styles.tagBadge}
                      style={{ background: tag.color, color: tag.text_color }}
                    >
                      {tag.label}
                    </div>
                  ))}
                </div>
              )}
               {isHovered && (
              <div className={styles.imageHoverContainer}>
                <div className={styles.imageHoverIcon}>
                  <img 
                  src={favoriteIcon}
                  alt="Добавить в избранное"
                  className={styles.favoriteIcon}/>
                </div>
                <div className={styles.imageHoverIcon}>
                  <img
                  src={comparisonIcon}
                  alt="Сравнить товары"
                  className={styles.comparisonIcon}/>
                </div>
              </div>
            )}
            </div>
          </div>
          <div className={styles.productDescription}>
            <div
              style={{ color: stock.color }}
              className={styles.stockContainer}
            >
              <img
              src={stock.icon}
              alt="stock-icon"
              className={styles.stockIcon}/>
              {stock.label}
            </div>
            <p className={styles.categoryName}>{category_name}</p>
            <div className={styles.smartphoneContainer}>
              <span
                className={clsx(styles.smartphoneName, {
                  [styles.smartphoneNameHovered]: isHovered,
                })}
              >
                {name}
              </span>
            </div>
            <div className={styles.creditText}>{credit_text}</div>
            <div className={styles.priceContainer}>
              {hasDiscount && (
                <div className={styles.oldPrice}>
                  {old_price} <span className={styles.rup}>RUP</span>
                </div>
              )}
              <div className={styles.shopContainer}>
                <span
                  className={clsx(styles.price, {
                    [styles.priceHovered]: isHovered,
                  })}
                >
                  {price} <span className={styles.rup}>RUP</span>
                </span>
              </div>
              <div className={styles.shopIcon}>
                <img src={shopIcon} 
                alt="shop" 
                className={styles.shopIconImage}
                />
              </div>
            </div>
          </div>
        </a>
      </div>
    </>
  );
}
