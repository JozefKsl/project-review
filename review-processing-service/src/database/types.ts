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

export type StatsDto = {
    productId: number;
    createdAt: Date;
    updatedAt: Date;
    reviewCount: number;
    totalRatingPoints: number;
    avgRating: number;
};
