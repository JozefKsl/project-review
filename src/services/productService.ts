import { Product, ProductBase, Review } from './types';

export interface ProductService {
    createProduct(product: ProductBase): Promise<Product>;
    deleteProduct(productId: number): Promise<number>;
    updateProduct(product: Product): Promise<Product>;
    getProduct(productId: number): Promise<Product>;
    listProducts(): Promise<Product[]>;
}
