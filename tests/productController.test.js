// __tests__/productController.test.js
const Product = require('../models/Product');
const productController = require('../controllers/productController');

// Mock the Product model methods
jest.mock('../models/Product');

describe('Product Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


  describe('getProductById', () => {
    it('should return a product by ID', async () => {
      const req = { params: { id: '1' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockProduct = { name: 'Product1' };
      Product.findById.mockResolvedValue(mockProduct);

      await productController.getProductById(req, res);

      expect(Product.findById).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    it('should handle product not found', async () => {
      const req = { params: { id: '1' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Product.findById.mockResolvedValue(null);

      await productController.getProductById(req, res);

      expect(Product.findById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
    });

    it('should handle errors', async () => {
      const req = { params: { id: '1' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const errorMessage = 'Error fetching product';
      Product.findById.mockRejectedValue(new Error(errorMessage));

      await productController.getProductById(req, res);

      expect(Product.findById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const req = { body: { name: 'Product1' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockProduct = { name: 'Product1' };
      Product.create.mockResolvedValue(mockProduct);

      await productController.createProduct(req, res);

      expect(Product.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    it('should handle errors', async () => {
      const req = { body: { name: 'Product1' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const errorMessage = 'Error creating product';
      Product.create.mockRejectedValue(new Error(errorMessage));

      await productController.createProduct(req, res);

      expect(Product.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });

  describe('updateProduct', () => {
    it('should update a product by ID', async () => {
      const req = { params: { id: '1' }, body: { name: 'UpdatedProduct' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockProduct = { name: 'UpdatedProduct' };
      Product.findByIdAndUpdate.mockResolvedValue(mockProduct);

      await productController.updateProduct(req, res);

      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith('1', req.body, { new: true });
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    it('should handle product not found', async () => {
      const req = { params: { id: '1' }, body: { name: 'UpdatedProduct' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Product.findByIdAndUpdate.mockResolvedValue(null);

      await productController.updateProduct(req, res);

      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith('1', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
    });

    it('should handle errors', async () => {
      const req = { params: { id: '1' }, body: { name: 'UpdatedProduct' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const errorMessage = 'Error updating product';
      Product.findByIdAndUpdate.mockRejectedValue(new Error(errorMessage));

      await productController.updateProduct(req, res);

      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith('1', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product by ID', async () => {
      const req = { params: { id: '1' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockProduct = { name: 'Product1' };
      Product.findByIdAndDelete.mockResolvedValue(mockProduct);

      await productController.deleteProduct(req, res);

      expect(Product.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith({ message: 'Product deleted successfully' });
    });

    it('should handle product not found', async () => {
      const req = { params: { id: '1' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      Product.findByIdAndDelete.mockResolvedValue(null);

      await productController.deleteProduct(req, res);

      expect(Product.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
    });

    it('should handle errors', async () => {
      const req = { params: { id: '1' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const errorMessage = 'Error deleting product';
      Product.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

      await productController.deleteProduct(req, res);

      expect(Product.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });
});
