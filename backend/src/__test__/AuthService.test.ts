// src/services/authService.test.ts

import * as authService from '../services/AuthService';
import * as userDAO from '../daos/UserDAO';
import { AppUser } from '../models/AppUser';
import { CustomError } from '../errors/CustomError';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

jest.mock('../daos/UserDAO');
// jest.mock('bcrypt'); // Remove or comment out this line
// jest.mock('jsonwebtoken'); // Remove or comment out this line
jest.mock('uuid');

const mockedUserDAO = userDAO as jest.Mocked<typeof userDAO>;
const mockedUuidv4 = uuidv4 as jest.MockedFunction<typeof uuidv4>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('signUp', () => {
  it('should create a new user and return it', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    // Mock userDAO.getUserByEmail to return undefined (no existing user)
    mockedUserDAO.getUserByEmail.mockResolvedValue(undefined);

    // Mock uuidv4 to return a fixed UUID
    mockedUuidv4.mockReturnValue('test-uuid');

    // Mock userDAO.createUser to resolve without error
    mockedUserDAO.createUser.mockResolvedValue();

    // Set bcrypt salt rounds to 1 for testing to speed up hashing
    const saltRounds = 1;

    const result = await authService.signUp(email, password);

    expect(result.id).toBe('test-uuid');
    expect(result.email).toBe(email);
    expect(result.name).toBe('User');
    expect(typeof result.password).toBe('string');
    expect(result.password.length).toBeGreaterThan(0);

    expect(mockedUserDAO.getUserByEmail).toHaveBeenCalledWith(email);
    expect(mockedUserDAO.createUser).toHaveBeenCalledWith(result);
  });

  it('should throw an error if the user already exists', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    const existingUser: AppUser = {
      id: 'existing-uuid',
      email,
      password: 'existingHashedPassword',
      name: 'Existing User',
    };
    mockedUserDAO.getUserByEmail.mockResolvedValue(existingUser);

    await expect(authService.signUp(email, password)).rejects.toThrow(
      new CustomError(400, 'User with this email already exists')
    );

    expect(mockedUserDAO.getUserByEmail).toHaveBeenCalledWith(email);
    expect(mockedUserDAO.createUser).not.toHaveBeenCalled();
  });
});

describe('login', () => {
  it('should return the user if email and password are correct', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    const hashedPassword = await bcrypt.hash(password, 1);

    const user: AppUser = {
      id: 'user-uuid',
      email,
      password: hashedPassword,
      name: 'Test User',
    };
    mockedUserDAO.getUserByEmail.mockResolvedValue(user);

    const result = await authService.login(email, password);

    expect(result).toEqual(user);
    expect(mockedUserDAO.getUserByEmail).toHaveBeenCalledWith(email);
  });

  it('should throw an error if the email does not exist', async () => {
    const email = 'nonexistent@example.com';
    const password = 'password123';

    mockedUserDAO.getUserByEmail.mockResolvedValue(undefined);

    await expect(authService.login(email, password)).rejects.toThrow(
      new CustomError(401, 'Invalid email or password')
    );

    expect(mockedUserDAO.getUserByEmail).toHaveBeenCalledWith(email);
  });

  it('should throw an error if the password is incorrect', async () => {
    const email = 'test@example.com';
    const password = 'wrongPassword';

    // Hash a different password to store in the mock user
    const hashedPassword = await bcrypt.hash('correctPassword', 1);

    // Mock userDAO.getUserByEmail to return a user
    const user: AppUser = {
      id: 'user-uuid',
      email,
      password: hashedPassword,
      name: 'Test User',
    };
    mockedUserDAO.getUserByEmail.mockResolvedValue(user);

    await expect(authService.login(email, password)).rejects.toThrow(
      new CustomError(401, 'Invalid email or password')
    );

    expect(mockedUserDAO.getUserByEmail).toHaveBeenCalledWith(email);
  });
});

describe('generateToken', () => {
  it('should generate a JWT token for the user', () => {
    const user: AppUser = {
      id: 'user-uuid',
      email: 'test@example.com',
      password: 'hashedPassword123',
      name: 'Test User',
    };

    process.env.JWT_SECRET = 'test-secret';

    const token = authService.generateToken(user);

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

    expect(decoded.uid).toBe(user.id);
    expect(decoded.role).toBe('user');
    expect(decoded.email).toBe(user.email);
    expect(decoded.name).toBe(user.name);
    expect(decoded.password).toBe(user.password);
  });
});
