import useAuth from "../../hooks/useAuth"
import OyezCard from "../../components/common/OyezCard"
import OyezLoader from "../../components/common/OyezLoader"

function Dashboard() {
  const { user, userLoading } = useAuth()

  if (userLoading) {
    return <OyezLoader />
  }

  if (!user) {
    return (
      <OyezCard title="Profile" authform>
        <h4>Please log in to view your profile.</h4>
      </OyezCard>
    )
  }

  return (
    <OyezCard title="Profile" authform>
      <p>{user.username}</p>
      {user.isAdmin && <p style={{ color: "darkblue "}}>You are admin!</p>}
    </OyezCard>
  )
}

export default Dashboard
