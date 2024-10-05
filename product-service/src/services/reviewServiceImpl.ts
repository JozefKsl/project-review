import { Broker } from '../broker/broker';
import { Database } from '../database/database';
import { ReviewDto } from '../database/types';
import { ReviewService } from './reviewService';
import {
    Review,
    ReviewBase,
    ReviewEventType,
    ReviewUpdateEvent,
} from './types';
import { v4 as uuidv4 } from 'uuid';

/**
 * IMPROVEMENTS
 *
 * - implement error handling to translate data level error to something more
 * meaningful
 */

export class ReviewServiceImpl implements ReviewService {
    constructor(
        private database: Database,
        private broker: Broker
    ) {}

    public async createReview(review: ReviewBase): Promise<Review> {
        const createdReview = await this.database.createReview(review);
        const mappedReview = this.mapReview(createdReview);

        await this.publishEvent(ReviewEventType.CREATE, mappedReview);

        return mappedReview;
    }

    public async deleteReview(reviewId: number): Promise<number> {
        const deletedReview = await this.database.deleteReview(reviewId);
        console.log(deletedReview)
        const mappedReview = this.mapReview(deletedReview);

        await this.publishEvent(ReviewEventType.DELETE, mappedReview);

        return mappedReview.id;
    }

    public async updateReview(
        reviewId: number,
        review: Review
    ): Promise<Review> {
        const updatedReview = await this.database.updateReview(
            reviewId,
            review
        );
        const mappedReview = this.mapReview(updatedReview);

        await this.publishEvent(ReviewEventType.UPDATE, mappedReview);

        return mappedReview;
    }

    public async listReviews(productId: number): Promise<Review[]> {
        const reviews = await this.database.listReviewsForProduct(productId);
        return reviews.map(this.mapReview);
    }

    private async publishEvent(eventType: ReviewEventType, review: Review) {
        const event: ReviewUpdateEvent = {
            id: uuidv4(),
            createdAt: new Date().getTime(),
            eventType: eventType,
            review: review,
        };

        await this.broker.sendToQueue(JSON.stringify(event));
    }

    private mapReview(reviewDto: ReviewDto): Review {
        return {
            id: reviewDto.id,
            firstName: reviewDto.firstName,
            lastName: reviewDto.lastName,
            reviewText: reviewDto.reviewText,
            rating: reviewDto.rating,
            productId: reviewDto.productId
        };
    }
}
