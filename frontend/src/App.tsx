import { useEffect, useState } from 'react';
import './App.css';
import { getUser, logout } from './app/actions/authActions';
import { useAppDispatch, useAppSelector } from './app/hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  const userProfileData = useAppSelector((state) => state.auth.userProfileData);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);

  useEffect(() => {
    if (basicUserInfo) {
      setProfileLoading(true);
      dispatch(getUser())
        .then(() => setProfileLoading(false))
        .catch((error) => {
          setProfileError(error.message);
          // Optionally: Handle error as needed (display error message, etc.)
        });
    }
  }, [basicUserInfo, dispatch]);


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
    <div>
       {profileLoading && <p>Loading user profile...</p>}
        {profileError && <p>Error: {profileError}</p>}
        {userProfileData && (
          <>
            <h1>Name: {userProfileData.fullname}</h1>
            {/* Other user profile details */}
          </>
        )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default App;
