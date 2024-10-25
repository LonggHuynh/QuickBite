import { User } from './models/User';
import { jwtDecode } from 'jwt-decode';

export const JwtToUser = (jwt: string): User => {
  const user = jwtDecode<User>(jwt);
  return user;
};

export const isTokenExpired = (jwt: string): boolean => {
  const token = jwtDecode<{ exp: number }>(jwt);
  return Date.now() >= token.exp * 1000;
};
