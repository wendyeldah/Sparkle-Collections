// __tests__/userController.test.js
const User = require('../models/User');
const userController = require('../controllers/userController');

// Mock the User model methods
jest.mock('../models/User');

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should create a new user', async () => {
      const req = { body: { email: 'test@test.com', password: 'password' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockUser = { email: 'test@test.com', password: 'password' };
      User.create.mockResolvedValue(mockUser);

      await userController.signup(req, res);

      expect(User.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ status: 'success', data: { user: mockUser } });
    });

    it('should handle errors', async () => {
      const req = { body: { email: 'test@test.com', password: 'password' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const errorMessage = 'Error creating user';
      User.create.mockRejectedValue(new Error(errorMessage));

      await userController.signup(req, res);

      expect(User.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ status: 'fail', message: errorMessage });
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockUsers = [{ email: 'test1@test.com' }, { email: 'test2@test.com' }];
      User.find.mockResolvedValue(mockUsers);

      await userController.getAllUsers(req, res);

      expect(User.find).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 'success', data: { users: mockUsers } });
    });

    it('should handle errors', async () => {
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const errorMessage = 'Error fetching users';
      User.find.mockRejectedValue(new Error(errorMessage));

      await userController.getAllUsers(req, res);

      expect(User.find).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ status: 'fail', message: errorMessage });
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const req = { params: { userId: '1' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockUser = { email: 'test@test.com' };
      User.findById.mockResolvedValue(mockUser);

      await userController.getUserById(req, res);

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 'success', data: { user: mockUser } });
    });

    it('should handle user not found', async () => {
      const req = { params: { userId: '1' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      User.findById.mockResolvedValue(null);

      await userController.getUserById(req, res);

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ status: 'fail', message: 'User not found' });
    });

    it('should handle errors', async () => {
      const req = { params: { userId: '1' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const errorMessage = 'Error fetching user';
      User.findById.mockRejectedValue(new Error(errorMessage));

      await userController.getUserById(req, res);

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ status: 'fail', message: errorMessage });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by ID', async () => {
      const req = { params: { userId: '1' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockUser = { email: 'test@test.com' };
      User.findByIdAndDelete.mockResolvedValue(mockUser);

      await userController.deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({ status: 'success', data: null });
    });

    it('should handle user not found', async () => {
      const req = { params: { userId: '1' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      User.findByIdAndDelete.mockResolvedValue(null);

      await userController.deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ status: 'fail', message: 'User not found' });
    });

    it('should handle errors', async () => {
      const req = { params: { userId: '1' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const errorMessage = 'Error deleting user';
      User.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

      await userController.deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ status: 'fail', message: errorMessage });
    });
  });
});
