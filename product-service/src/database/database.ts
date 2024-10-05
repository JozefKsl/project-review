import { ProductDto, ReviewDto } from './types';

export interface Database {
    createProduct(product: Partial<ProductDto>): Promise<ProductDto>;
    deleteProduct(productId: number): Promise<ProductDto>;
    updateProduct(
        productId: number,
        productUpdates: Partial<ProductDto>
    ): Promise<ProductDto>;
    getProduct(productId: number): Promise<ProductDto>;
    listProducts(): Promise<ProductDto[]>;
    listReviewsForProduct(productId: number): Promise<ReviewDto[]>;
    createReview(review: Partial<ReviewDto>): Promise<ReviewDto>;
    deleteReview(reviewId: number): Promise<ReviewDto>;
    updateReview(
        reviewId: number,
        reviewUpdates: Partial<ReviewDto>
    ): Promise<ReviewDto>;
}
