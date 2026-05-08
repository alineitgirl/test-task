# widget-new-items

Встраиваемый виджет для отображения карточек товаров.  
Получает данные из API и рендерит список с пагинацией.

---

## Стек

- React 18 + TypeScript
- Vite (сборка в `iife`-формат)
- CSS Modules

---

## Структура проекта

```
src/
├── api/
│   └── fetchCards.ts         # Запросы к API, fetchCollectionById()
├── assets/                   # Статические файлы (иконки, шрифты)
├── components/
│   ├── Card.tsx              # Компонент одной карточки товара
│   └── CardList.tsx          # Список карточек, скелетон, состояния загрузки
├── styles/
│   ├── card.module.css       # Стили карточки (CSS Module)
│   ├── cardList.module.css   # Стили слайдера, пагинации, анимаций
│   └── widget.module.css     # CSS-переменные, общий reset
├── types/
│   └── index.ts              # TypeScript-интерфейсы (Product, Tag, Collection)
├── main.tsx                  # Точка входа для dev-режима
├── vite-env.d.ts             # Декларации типов для Vite
└── Widget.tsx                # Корневой компонент, управляет пагинацией
```

---

## Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Открой `http://localhost:5173` — виджет запустится в dev-режиме.

### Сборка

```bash
npm run build
```

## Переменные окружения

Создай файл `.env` в корне проекта:

```env
VITE_API_URL=URL_твоего_API
VITE_PRODUCT_URL=ENDPOINT_для_продукта
VITE_COLLECTION_ID=ID_коллекции_которую_нужно_рендерить
```

Используются в `src/api/fetchCards.ts`:

```ts
const BASE_URL = import.meta.env.VITE_API_URL
```

---

## Деплой на GitHub Pages

После деплоя виджет доступен по адресу:
```
https://твой-юзер.github.io/test-task/
```

---

## Компоненты

### `<Widget />`
Корневой компонент. Хранит состояние текущей страницы, передаёт его в `CardList` и `Pagination`.

| Prop | Тип | Описание |
|------|-----|----------|
| `collectionId` | `number` | ID коллекции товаров |

### `<CardList />`
Загружает товары с API, нарезает по страницам, рендерит карточки.

| Prop | Тип | Описание |
|------|-----|----------|
| `collectionId` | `number` | ID коллекции товаров |
| `page` | `number` | Текущая страница |
| `onTotalPagesChange` | `(n: number) => void` | Коллбэк с общим количеством товаров |

### `<Card />`
Карточка одного товара. Принимает объект типа `Product`.

| Prop | Тип | Описание |
|------|-----|----------|
| `name` | `string` | Название товара |
| `slug` | `string` | URL-идентификатор |
| `category_name`| `string` | Название категории
| `price` | `number` | Цена |
| `old_price` | `number \| null` | Старая цена (если есть скидка) |
| `credit_text` | `string \| null` | Текст рассрочки |
| `stock_status` | `StockStatus` | Статус наличия |
| `preview_image` | `string` | URL картинки |
| `tags` | `Tag[]` | Массив тегов |
| `discount_type` | `string` | Тип скидки (если есть скидка)
---

## Типы

```ts
type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'

interface Tag {
  slug: string
  label: string
  color: string
  text_color: string
}

interface Product {
  id: number
  name: string
  slug: string
  sku: string
  price: number
  old_price: number | null
  credit_text: string | null
  is_creditable: boolean
  category_name: string
  stock_status: StockStatus
  is_favorite: boolean
  preview_image: string
  tags: Tag[],
  discount_type: string
}
```

---

## CSS-переменные

Все цвета и размеры задаются в `widget.module.css` и легко переопределяются:

| Переменная | Значение по умолчанию | Описание |
|---|---|---|
| `--primary-blue` | `#0090ff` | Основной голубой |
| `--primary-bg` | `#f5f5f5` | Фон картинки |
| `--primary-dark` | `#1a1a1a` | Основной текст |
| `--primary-border` | `#e0e0e0` | Цвет границы карточки |
| `--primary-green` | `#00c48c` | Цвет "В наличии" |
| `--primary-orange` | `#ffa800` | Цвет "Мало" |
| `--primary-red` | `#ff4d4f` | Цвет "Нет в наличии" |