import { create } from 'zustand';
import { useNavigate } from 'react-router-dom';

interface IUserSignup {
  username: string;
  email: string;
  password: string;
}

interface AuthStore {
  isLoggedIn: boolean;
  signup: ({
    username, email, password
  }: IUserSignup) => void;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
   signup: async (data: IUserSignup) =>  {
    const navigate = useNavigate();
     await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(() => {
        navigate('/login');
        set({ isLoggedIn: true });
    })
    .catch(() => {});
  },
  login: () => {
    set({ isLoggedIn: true });
  },
  logout: () => {
    set({ isLoggedIn: false });
  },
}));

export default useAuthStore;