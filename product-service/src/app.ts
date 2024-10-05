import express, { Request, Response } from 'express';
import { initServices, productService, reviewService } from './container';
import { Review, ReviewBase } from './services/types';

const app = express();
app.use(express.json());

/**
 * IMPROVEMENTS
 *
 * - implement validation middleware
 * - translate service level error to errors that will make
 * more sense for FE
 */

app.post('/product', async (req: Request, res: Response) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error });
    }
});

app.delete('/product/:id', async (req: Request, res: Response) => {
    try {
        const deletedProductId = await productService.deleteProduct(
            parseInt(req.params.id)
        );
        res.status(200).json({ deletedProductId });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error });
    }
});

app.put('/product/:id', async (req: Request, res: Response) => {
    try {
        const updatedProduct = await productService.updateProduct({
            id: parseInt(req.params.id),
            ...req.body,
        });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error });
    }
});

app.get('/product', async (req: Request, res: Response) => {
    try {
        const products = await productService.listProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to list products', error });
    }
});

app.get('/product/:id', async (req: Request, res: Response) => {
    try {
        const product = await productService.getProduct(
            parseInt(req.params.id)
        );
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get product', error });
    }
});

app.get('/review/:productId', async (req: Request, res: Response) => {
    try {
        const reviews = await reviewService.listReviews(
            parseInt(req.params.productId)
        );
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get product reviews',
            error,
        });
    }
});

app.post('/review', async (req, res) => {
    try {
        const reviewData: ReviewBase = req.body;
        const createdReview = await reviewService.createReview(reviewData);
        res.status(201).json(createdReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Failed to create review' });
    }
});

app.delete('/review/:productId', async (req, res) => {
    const productId = parseInt(req.params.productId, 10);
    try {
        const deletedReviewId = await reviewService.deleteReview(productId);
        res.status(204).json({ id: deletedReviewId });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Failed to delete review' });
    }
});

app.put('/review/:reviewId', async (req, res) => {
    try {
        const reviewId = parseInt(req.params.reviewId, 10);
        const review: Review = req.body;
        const updatedReview = await reviewService.updateReview(
            reviewId,
            review
        );
        res.status(200).json(updatedReview);
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: 'Failed to update review' });
    }
});

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        await initServices();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer().then(() => {
    console.log('Server started!');
});
