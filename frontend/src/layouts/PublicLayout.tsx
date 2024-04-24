import { Outlet } from "react-router-dom"
import Header from "../components/header/Header";
import React from "react";

interface PublicLayoutProps {
  children?: React.ReactNode
}

const  PublicLayout:React.FC<PublicLayoutProps> = ({children}) => {
  return (
    <>
      <Header />
      <main className='flex flex-col justify-center items-center '>
       <div>{children}</div>
       <Outlet />
      </main>
    </>
  )
}
 
export default PublicLayout;