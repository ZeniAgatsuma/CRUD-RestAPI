class UpdateProductAction {
    /**
     * @param {Object} dependencies
     * @param {Repositories.IProductRepository} dependencies.productRepository
     */
    constructor({ productRepository }) {
        this.productRepository = productRepository;
    }

    /**
     * Updates an existing product.
     * @param {string} productId
     * @param {Object} updateData
     * @returns {Promise<Entities.Product>}
     */
    async execute(productId, updateData) {
        if (!productId) {
            throw new Error('Product ID is required');
        }

        // Fetch the product from the repository
        const product = await this.productRepository.getById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        const { createdAt, ...updateFields } = updateData;

        if (updateFields.name !== undefined) {
            product.name = updateFields.name;
        }

        if (updateFields.description !== undefined) {
            product.description = updateFields.description;
        }

        if (updateFields.price !== undefined) {
            product.price = updateFields.price;
        }

        if (updateFields.releaseDate !== undefined) {
            product.releaseDate = updateFields.releaseDate;
        }

        // Update the product in the repository, ensuring 'createdAt' remains unchanged
        const updatedProduct = await this.productRepository.update(product);

        // Return the updated product
        return updatedProduct;
    }
}

module.exports = { UpdateProductAction };
