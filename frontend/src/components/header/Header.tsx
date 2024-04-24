import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { useAppDispatch } from '../../app/hooks/redux-hooks';
import { logout } from '../../app/actions/authActions';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('userInfo');

  const handleLogout = async () => {
    try {
      await dispatch(logout());
        navigate('/login');
    } catch (err) {
      console.error(err);
      // Handle error as needed
    }
  };
  return (
    <header className="bg-gray-800 text-white flex justify-between items-center p-4">
      
      <Link to={isLoggedIn ? '/dashboard' : '/'}>
      <h1 className="text-2xl font-bold">Quote App</h1></Link>
      <nav>
          {
            isLoggedIn ? (
              <ul className="flex justify-center items-center space-x-4">
                <li>
                  <a href="/dashboard" className="text-gray-300 hover:text-white">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/profile" className="text-gray-300 hover:text-white">
                     <CgProfile size={30} />
                  </a>
                </li>
                <li className="flex gap-2 justify-center items-center" onClick={handleLogout}>
                  <Link to={"/logout"} className="text-gray-300 hover:text-white">
                    Logout
                  </Link>
                  <IoMdLogOut />
                </li>
                </ul>
            ) : (
              <ul className="flex space-x-4">
                <li>
                  <a href="/" className="text-gray-300 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/quotes" className="text-gray-300 hover:text-white">
                    Quotes
                  </a>
                </li>
                <li>
                  <Link to={"/login"} className="text-gray-300 hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <a href="/signup" className="text-gray-300 hover:text-white">
                    Signup
                  </a>
                </li>
              </ul>
            )
          }
      </nav>
    </header>
  );
};

export default Header;
