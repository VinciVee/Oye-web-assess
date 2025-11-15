import { useContext, useDebugValue } from 'react'
import AuthContext from '../contexts/AuthContext'

// Custom Hook to access our context
const useAuth = () => {
  const { user } = useContext(AuthContext)
  useDebugValue(user, user => user?.id ? "Logged in" : "Logged out")
  return useContext(AuthContext)
}

export default useAuth
