//
import { Outlet, Navigate, useLocation } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { toast } from "react-toastify" // TO DO: build a toast on redirect as well

function PrivateRoutes() {
  const { getCurrentUser } = useAuth()
  const location = useLocation()

  return (
    !getCurrentUser() // use getCurrentUser instead of "user"
      ? <Navigate to="/login" state={{ from: location }} replace /> // Logged out
      : <Outlet /> // Logged in
    // Note: No curly braces needed here.
    // Curly braces are needed when writing JS in HTML - but there is no HTML here.
  )
}

export default PrivateRoutes
