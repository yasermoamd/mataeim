import { FormEvent, useState } from "react";
import { useAppDispatch } from "../app/hooks/redux-hooks";
import { register } from "../app/actions/authActions";
import { useNavigate } from "react-router-dom";

export const  SignupForm  = () =>  {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // This is only a basic validation of inputs. Improve this as needed.
    if (email && password && fullname) {
      try {
        dispatch(register({ fullname, email, password }));
        navigate("/login");
      } catch (e) {
        console.error(e);
      }
    } else {
      // Show an error message.
    }
  };
  return (
    <form
    className="flex flex-col my-8 gap-4 justify-center items-center">
      <input
          className="border border-gray-300 p-2 w-[400px]"
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          name="fullname" 
          id="fullname" />
      <input
          className="border border-gray-300 p-2 w-[400px]"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email" 
          id="email" />
      <input 
          className="border border-gray-300 p-2 w-[400px]"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password" 
          id="password" />
        <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 w-[300px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Signup
          </button>
      </form>
  )
}

 