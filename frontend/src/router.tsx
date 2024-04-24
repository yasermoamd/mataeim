import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import App from "./App"
import AuthLayout from "./layouts/AuthLayout"
import PublicLayout from "./layouts/PublicLayout"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Signup from "./pages/Signup"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<div>Logout</div>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </Route>
  )
);