import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'
import { Provider } from 'react-redux'
import  store from './app/store/store.ts'
import AuthLayout from './layouts/AuthLayout.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} />,
      <Route path="/login" element={<Login />} />,
      <Route path="/signup" element={<Signup />} />,
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Provider store={store}>
       <RouterProvider router={router} />
     </Provider>
  </React.StrictMode>,
)
