export type ProductDto = {
    id: number;
    name: string;
    description: string | null;
    price: number;
    createdAt: Date;
    updatedAt: Date;
};

export type ReviewDto = {
    id: number;
    firstName: string;
    lastName: string;
    reviewText: string;
    rating: number;
    productId: number;
    createdAt: Date;
    updatedAt: Date;
};
