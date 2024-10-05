export type ReviewUpdateEvent = {
    id: string;
    createdAt: number;
    eventType: ReviewEventType;
    review: Review;
};

export enum ReviewEventType {
    UPDATE = 'UPDATE',
    CREATE = 'CREATE',
    DELETE = 'DELETE',
}

export type ProductBase = {
    name: string;
    description: string | null;
    price: number;
    reviews?: Review[];
};

export type Product = {
    id: number;
    averageRating?: number;
} & ProductBase;

export type ReviewBase = {
    firstName: string;
    lastName: string;
    reviewText: string;
    rating: number;
};

export type Review = {
    id: number;
    productId: number;
} & ReviewBase;
