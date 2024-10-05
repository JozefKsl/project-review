import { ReviewEventType } from "../services/types";

export interface Database {
    updateStatsAfterReview(eventType: ReviewEventType, productId: number, reviewId: number, rating: number): Promise<void>;
}
