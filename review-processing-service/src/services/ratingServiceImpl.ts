import { Database } from '../database/database';
import { RatingService } from './ratingService';
import { ReviewEventType, ReviewUpdateEvent } from './types';

export class RatingServiceImpl implements RatingService {
    constructor(private database: Database) {}

    public async updateRating(event: ReviewUpdateEvent) {
        const { id, productId, rating } = event.review;
        await this.database.updateStatsAfterReview(
            event.eventType,
            productId,
            id,
            rating
        );
    }
}
