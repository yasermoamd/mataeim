import { CgProfile } from "react-icons/cg";
import useAuthStore from "../app/store/authStore";

function HeaderComponent() {
  const auth = useAuthStore((state) => state.isLoggedIn);
  return (
    <header className='flex justify-around items-center py-2'>
      <div>
        <h1 className="text-xl font-bold">My Logo</h1>
      </div>
      {auth ? (
        <div className="flex gap-4">
          <div>Feed</div>
          <div>Friends</div>
          <div className="cursor-pointer">
            <CgProfile className="w-6 h-6 rounded-full" />
          </div>
        </div>
      ) : null}
      {!auth && (
        <div className="flex gap-4">
          <div>About</div>
          <div>Privacy</div>
          <div>Contact Us</div>
        </div>
      )}
    </header>
  );
}

export default HeaderComponent;
