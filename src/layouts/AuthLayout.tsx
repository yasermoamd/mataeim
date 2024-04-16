import { AddPostComponent } from "../components/AddPost";
import HeaderComponent from "../components/HeaderComponent";


function AuthLayout({ children }: {
    children: React.ReactNode;
}) {
  return (
    <>
      <HeaderComponent />
      <main className='flex flex-col justify-center items-center '>
        {children}
      </main>
    </>
  )
}
 
export default AuthLayout;