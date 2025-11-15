import { useAuth } from "../../contexts/AuthContext"
import OyezCard from "../../components/common/OyezCard"
import React from "react"

function Dashboard() {
  const { user } = useAuth()
  //const { username, email, isAdmin } = user

  // React.useEffect(() => {
  //   const { username, email, isAdmin } = getCurrentUser()
  //   return user
  // }, [])

  return (
    <OyezCard title="Profile" authform>
      <p>{user.username}</p>
      {user.isAdmin && <p style={{ color: "darkblue "}}>You are admin!</p>}
    </OyezCard>
  )
}

export default Dashboard
