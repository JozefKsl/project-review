import { Broker } from '../broker/broker';
import { Database } from '../database/database';
import { ProductDto, Stats } from '../database/types';
import { ProductService } from './productService';
import { Product, ProductBase, Review } from './types';

/**
 * IMPROVEMENTS
 *
 * - implement error handling to translate data level error to something more
 * meaningful
 */

export class ProductServiceImpl implements ProductService {
    constructor(private database: Database) {}

    public async createProduct(product: ProductBase) {
        const createdProduct = await this.database.createProduct(product);
        return this.mapProduct(createdProduct);
    }

    public async deleteProduct(productId: number): Promise<number> {
        const deletedProduct = await this.database.deleteProduct(productId);
        return deletedProduct.id;
    }

    public async updateProduct(product: Product): Promise<Product> {
        const updatedProduct = await this.database.updateProduct(
            product.id,
            product
        );
        return this.mapProduct(updatedProduct);
    }

    public async getProduct(productId: number): Promise<Product> {
        const retrievedProduct = await this.database.getProduct(productId);

        return this.mapProduct(retrievedProduct);
    }

    public async listProducts(): Promise<Product[]> {
        const products = await this.database.listProducts();
        return products.map(this.mapProduct);
    }

    private mapProduct(product: ProductDto): Product {
        const mappedProduct: Product = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            averageRating: product?.avgRating ?? 0,
        };

        return mappedProduct;
    }
}
