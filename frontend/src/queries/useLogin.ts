import { useMutation } from '@tanstack/react-query';
import api from '../api';
import { User } from '../models/User';

import useUserStore from '../stores/useUserStore';
import { LoginData } from '../models/LoginData';
import { JwtToUser } from '../utils';

const login = async (data: LoginData) => {
  const credentials = btoa(`${data.email}:${data.password}`);

  const response = await api.post<User>(
    '/auth/login',
    {},
    {
      withCredentials: true,
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    }
  );
  const token = response.headers['authorization'].split(' ').pop();
  localStorage.setItem('token', token);
  const user = JwtToUser(token);
  return user;
};

export const useLogin = () => {
  const setUser = useUserStore((state) => state.setUser);
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data);
    },
  });
};
