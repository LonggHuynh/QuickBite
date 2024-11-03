import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

import * as authService from '../services/AuthService';
import * as userDAO from '../daos/UserDAO';
import { AppUser } from '../models/AppUser';
import { CustomHttpError } from '../errors/CustomHttpError';

jest.mock('../daos/UserDAO');
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

    mockedUserDAO.getUserByEmail.mockResolvedValue(undefined);
    mockedUuidv4.mockReturnValue('test-uuid');
    mockedUserDAO.createUser.mockResolvedValue();



    const result = await authService.signUp(email, password);

    expect(result.id).toBe('test-uuid');
    expect(result.email).toBe(email);
    expect(result.name).toBe('User');
    expect(result.password).toBeUndefined();

    expect(mockedUserDAO.getUserByEmail).toHaveBeenCalledWith(email);
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
      new CustomHttpError(400, 'User with this email already exists')
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
      new CustomHttpError(401, 'Invalid email or password')
    );

    expect(mockedUserDAO.getUserByEmail).toHaveBeenCalledWith(email);
  });

  it('should throw an error if the password is incorrect', async () => {
    const email = 'test@example.com';
    const password = 'wrongPassword';

    const hashedPassword = await bcrypt.hash('correctPassword', 1);

    const user: AppUser = {
      id: 'user-uuid',
      email,
      password: hashedPassword,
      name: 'Test User',
    };
    mockedUserDAO.getUserByEmail.mockResolvedValue(user);

    await expect(authService.login(email, password)).rejects.toThrow(
      new CustomHttpError(401, 'Invalid email or password')
    );

    expect(mockedUserDAO.getUserByEmail).toHaveBeenCalledWith(email);
  });
});

describe('generateToken', () => {
  it('should generate a JWT token for the user', () => {
    const user: AppUser = {
      id: 'user-uuid',
      email: 'test@example.com',
      name: 'Test User',
    };

    process.env.JWT_SECRET = 'test-secret';

    const token = authService.generateToken(user);

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

    expect(decoded.uid).toBe(user.id);
    expect(decoded.role).toBe('user');
    expect(decoded.email).toBe(user.email);
    expect(decoded.name).toBe(user.name);
  });

  it('should remove password from JWT', () => {
    const user: AppUser = {
      id: 'user-uuid',
      email: 'test@example.com',
      name: 'Test User',
      password: '123428'
    };

    process.env.JWT_SECRET = 'test-secret';

    const token = authService.generateToken(user);

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

    expect(decoded.password).toBeUndefined();

  });
});
