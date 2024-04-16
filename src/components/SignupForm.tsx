import { useState } from "react";
import useAuthStore from "../app/store/authStore";

const SignupForm = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signup = useAuthStore((state) => ({
        signup: state.signup,
    }));
    const handleUserSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        signup.signup({ username, email, password });
    }
    return (
      <div className="flex flex-col items-center py-16">
        <h1 className="text-2xl font-bold mb-8">Sign Up</h1>
        <form className="max-w-md w-full">
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 font-medium">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onSubmit={handleUserSignup}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  };
  
  export default SignupForm;