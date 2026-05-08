export type LoadingStatus = 'loading' | 'success' | 'error';

export interface Collection {
    id: number;
    data: Product[];
}

export interface Product {
    id: number;
    slug: string;
    name: string;
    category_name: string;
    price: number;
    old_price: number | null;
    credit_text: string;
    stock_status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
    preview_image: string;
    tags: Tag[];
    discount_type: string;
}

export interface Tag {
    slug: string;
    label: string;
    color: string;
    text_color: string;
}

export interface  CardListProps {
    collectionId: number;
    currentPage: number;
    onTotalPagesChange: (pages: number) => void;
}

export interface WidgetProps {
    collectionId?: number;
}

