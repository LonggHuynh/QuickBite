import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { getUserByEmail, createUser } from '../daos/UserDAO';
import { CustomError } from '../errors/CustomError';
import { AppUser } from '../models/AppUser';

export const signUp = async (email: string, password: string): Promise<AppUser> => {

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new CustomError(400, 'User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        id: uuidv4(),
        email,
        password: hashedPassword,
        name: "User",

    };

    await createUser(user);
    return user
}

export const login = async (email: string, password: string): Promise<AppUser> => {

    const user = await getUserByEmail(email);
    if (!user) {
        throw new CustomError(401, 'Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new CustomError(401, 'Invalid email or password');
    }

    return user;
}

export const generateToken = (user: AppUser): string => {
    return jwt.sign({ uid: user.id, role: 'user', ...user }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
}


