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
