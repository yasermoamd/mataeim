import { Outlet } from "react-router-dom"
import HeaderComponent from "../components/HeaderComponent";


function PublicLayout({ children }: {
    children: React.ReactNode;
}) {
  return (
    <>
      <HeaderComponent />
      <main className='flex flex-col justify-center items-center '>
       <div>{children}</div>
       <Outlet />
      </main>
    </>
  )
}
 
export default PublicLayout;