import { AddPostComponent } from "../components/AddPost";
import HeaderComponent from "../components/HeaderComponent";


function PublicLayout({ children }: {
    children: React.ReactNode;
}) {
  return (
    <>
      <HeaderComponent />
      <main className='flex flex-col justify-center items-center '>
      <AddPostComponent />


       <div>{children}</div>
      </main>
    </>
  )
}
 
export default PublicLayout;