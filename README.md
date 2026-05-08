# widget-new-items

Встраиваемый виджет для отображения карточек товаров.  
Получает данные из API, рендерит список с пагинацией и поддерживает вставку на любой сайт одной строкой.

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
│   ├── cardList.module.css   # Стили сетки, пагинации, анимаций
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

После сборки в папке `dist/` появятся два файла:

- `widget.iife.js` — весь JavaScript виджета
- `widget.css` — все стили

---

## Подключение на сайт

Вставь две строки в любой HTML-файл:

```html
<link rel="stylesheet" href="https://твой-юзер.github.io/widget-new-items/widget.css">
<script src="https://твой-юзер.github.io/widget-new-items/widget.iife.js"></script>
```

Виджет автоматически создаст контейнер и вставит карточки на страницу.

---

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

Пуш в ветку `main` запускает автоматический деплой через GitHub Actions.  
Конфиг находится в `.github/workflows/deploy.yml`.

После деплоя виджет доступен по адресу:
```
https://твой-юзер.github.io/widget-new-items/
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
| `price` | `number` | Цена |
| `old_price` | `number \| null` | Старая цена (если есть скидка) |
| `credit_text` | `string \| null` | Текст рассрочки |
| `stock_status` | `StockStatus` | Статус наличия |
| `preview_image` | `string` | URL картинки |
| `tags` | `Tag[]` | Массив тегов |

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
  tags: Tag[]
}
```

---

## CSS-переменные

Все цвета и размеры задаются в `widget.module.css` и легко переопределяются:

| Переменная | Значение по умолчанию | Описание |
|---|---|---|
| `--w-bg-card` | `#ffffff` | Фон карточки |
| `--w-bg-image` | `#f7f7f7` | Фон картинки |
| `--w-text-primary` | `#1a1a1a` | Основной текст |
| `--w-text-secondary` | `#666666` | Вторичный текст |
| `--w-text-muted` | `#aaaaaa` | Приглушённый текст |
| `--w-stock-in` | `#2d7a3a` | Цвет "В наличии" |
| `--w-stock-low` | `#b45309` | Цвет "Мало" |
| `--w-stock-out` | `#c0392b` | Цвет "Нет в наличии" |
| `--w-badge-bg` | `#fff3cd` | Фон бейджа рассрочки |
| `--w-badge-text` | `#856404` | Текст бейджа рассрочки |