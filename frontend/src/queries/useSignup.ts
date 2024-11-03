import { useMutation } from '@tanstack/react-query';
import useUserStore from '../stores/useUserStore';
import api from '../api';
import { User } from '../models/User';

interface SignupData {
  email: string;
  password: string;
  displayName: string;
}
export const useSignup = () => {
  const setUser = useUserStore((state) => state.setUser);
  return useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await api.post<User>('/auth/signup', data);
      const user = response.data;
      const token = response.headers['authorization'];
      localStorage.setItem('token', token);

      return user;
    },
    onSuccess: (data) => {
      setUser(data);
    },
  });
};
