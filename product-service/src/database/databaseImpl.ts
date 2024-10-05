import { Knex } from 'knex';
import { Database } from './database';
import { ProductDto, ReviewDto } from './types';

export class DatabaseImpl implements Database {
    constructor(
        private client: Knex,
        private productTableName: string,
        private reviewTableName: string
    ) {}

    public async createProduct(
        product: Partial<ProductDto>
    ): Promise<ProductDto> {
        const [createdProduct] = await this.client(this.productTableName)
            .insert(product)
            .returning('*');

        return createdProduct;
    }

    public async deleteProduct(productId: number): Promise<ProductDto> {
        const [deletedProduct] = await this.client(this.productTableName)
            .where({ id: productId })
            .delete()
            .returning('*');

        return deletedProduct;
    }

    public async updateProduct(
        productId: number,
        productUpdates: Partial<ProductDto>
    ): Promise<ProductDto> {
        const [updatedProduct] = await this.client(this.productTableName)
            .where({ id: productId })
            .update(productUpdates)
            .returning('*');

        return updatedProduct;
    }

    public async getProduct(productId: number): Promise<ProductDto> {
        const product = await this.client(this.productTableName)
            .where({ id: productId })
            .first();

        return product;
    }

    public async listProducts(): Promise<ProductDto[]> {
        return await this.client(this.productTableName).select('*');
    }

    public async listReviewsForProduct(
        productId: number
    ): Promise<ReviewDto[]> {
        return await this.client(this.reviewTableName)
            .select('*')
            .where({ productId });
    }

    public async createReview(review: Partial<ReviewDto>): Promise<ReviewDto> {
        const [createdReview] = await this.client(this.reviewTableName)
            .insert(review)
            .returning('*');

        return createdReview;
    }

    /**
     * TODO: handle a case when the review doesn't exist in the database
     */
    public async deleteReview(reviewId: number): Promise<ReviewDto> {
        const [deletedReview] = await this.client(this.reviewTableName)
            .where({ id: reviewId })
            .delete()
            .returning('*');
        
        return deletedReview;
    }

    public async updateReview(
        reviewId: number,
        reviewUpdates: Partial<ReviewDto>
    ): Promise<ReviewDto> {
        const [updatedReview] = await this.client(this.reviewTableName)
            .where({ id: reviewId })
            .update(reviewUpdates)
            .returning('*');

        return updatedReview;
    }
}
