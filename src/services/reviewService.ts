import { ReviewDto } from '../database/types';
import { Review, ReviewBase } from './types';

export interface ReviewService {
    createReview(review: ReviewBase): Promise<Review>;
    deleteReview(reviewId: number): Promise<number>;
    updateReview(reviewId: number, review: Partial<Review>): Promise<Review>;
    listReviews(productId: number): Promise<Review[]>;
}
