import { useState, useEffect, useContext, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

// Create the context
const AuthContext = createContext()

// Custom Hook to access our context
export function useAuth(){
  return useContext(AuthContext)
}

// Define the context (which includes returning a "provider" component)
export function AuthProvider({ children }){
  // Define the context items/functions: user object, login fn, getUser fn, logout fn
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // Call current user on every page mount
  useEffect(() => {
    const userData = getCurrentUser()
    setUser(userData)
  }, [])

  // 1. Login/Register funciotn
  const loginSaveUser = async (data) => {
    const { token } = data
    localStorage.setItem("token", token)
    // "user" is the property
    // localStorage.setItem("user", JSON.stringify(data)) // localStorage is browser memory - maintains memory between routes
    setUser(jwtDecode(token))
  }

  // 2. Check whether user is logged in
  function getCurrentUser(){
    try {
      const token = localStorage.getItem("token")
      const savedUser = jwtDecode(token)
      return savedUser

    } catch(error){
      console.log(`Error from getCurrentUser: ${error}`)
      return null
    }
  }

  // 3. Logout function
  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    navigate('/login')
  }


  // All properties will be contained in a "value" prop
  const value = {
    user,
    getCurrentUser,
    loginSaveUser,
    logout
  }

  // Returning the provider component
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
