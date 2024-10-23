
import { create } from 'zustand';
import { User } from '../models/User';
import { isTokenExpired, JwtToUser } from '../utils';



interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}


const extractUser = () => {
  const jwt = localStorage.getItem('token');
  return jwt && !isTokenExpired(jwt) ? JwtToUser(jwt) : null;
}

const useUserStore = create<UserState>((set) => ({
  user: extractUser(),
  setUser: (user) => set({ user }),
}));

export default useUserStore;
