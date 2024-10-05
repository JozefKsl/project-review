import { Database } from './database';
import { Knex } from 'knex';

export class DatabaseImpl implements Database {
    constructor(
        private client: Knex,
        private statsTableName: string,
        private reviewTableName: string
    ) {}

    public async updateStatsAfterReview(
        eventType: string,
        productId: number,
        reviewId: number,
        rating: number
    ): Promise<void> {
        await this.client.transaction(async (trx) => {
            const [stats] = await trx(this.statsTableName)
                .where({ productId })
                .select('reviewCount', 'totalRatingPoints', 'avgRating');

            if (eventType === 'CREATE') {
                if (stats) {
                    const newTotalRatingPoints =
                        stats.totalRatingPoints + rating;

                    const newReviewCount = stats.reviewCount + 1;
                    const newAvgRating = newTotalRatingPoints / newReviewCount;

                    await trx('stats').where({ productId }).update({
                        reviewCount: newReviewCount,
                        totalRatingPoints: newTotalRatingPoints,
                        avgRating: newAvgRating,
                    });
                } else {
                    await trx('stats').insert({
                        productId,
                        reviewCount: 1,
                        totalRatingPoints: rating,
                        avgRating: rating,
                    });
                }
            } else if (eventType === 'UPDATE') {
                const oldReview = await this.getOldReview(reviewId);
                const oldRating = oldReview ? oldReview.rating : 0;

                if (stats) {
                    const newTotalRatingPoints =
                        stats.totalRatingPoints - oldRating + rating;

                    const newAvgRating =
                        newTotalRatingPoints / stats.reviewCount;

                    await trx(this.statsTableName).where({ productId }).update({
                        totalRatingPoints: newTotalRatingPoints,
                        avgRating: newAvgRating,
                    });
                }
            } else if (eventType === 'DELETE') {
                /**
                 * TODO: totalRatingPoints are not being updated correctly
                 */
                const oldReview = await this.getOldReview(reviewId);
                const oldRating = oldReview ? oldReview.rating : 0;

                if (stats) {
                    const newTotalRatingPoints =
                        stats.totalRatingPoints - oldRating;

                    const newReviewCount = Math.max(stats.reviewCount - 1, 0);

                    const newAvgRating =
                        newReviewCount > 0
                            ? newTotalRatingPoints / newReviewCount
                            : 0;

                    await trx(this.statsTableName).where({ productId }).update({
                        reviewCount: newReviewCount,
                        totalRatingPoints: newTotalRatingPoints,
                        avgRating: newAvgRating,
                    });
                }
            }
        });
    }

    public async getOldReview(reviewId: number): Promise<any> {
        const product = await this.client(this.reviewTableName)
            .where({ id: reviewId })
            .first();

        return product;
    }
}
