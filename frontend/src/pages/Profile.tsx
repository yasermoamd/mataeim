import React from 'react'
import { getUser } from '../app/actions/authActions';
import { useAppDispatch, useAppSelector } from '../app/hooks/redux-hooks';

const Profile = () => {
    const dispatch = useAppDispatch();
  
    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    const userProfileData = useAppSelector((state) => state.auth.userProfileData);
    const [profileLoading, setProfileLoading] = React.useState(false);
    const [profileError, setProfileError] = React.useState(null);
  
    React.useEffect(() => {
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
    </div>
  )
}

export default Profile