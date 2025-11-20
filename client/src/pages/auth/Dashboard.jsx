import useAuth from "../../hooks/useAuth"
import OyezForm from "../../components/common/OyezForm"
import OyezLoader from "../../components/common/OyezLoader"

function Dashboard() {
  const { user, userLoading } = useAuth()

  if (userLoading) {
    return <OyezLoader />
  }

  if (!user) {
    return (
      <OyezForm title="Profile" authform>
        <h4>Please log in to view your profile.</h4>
      </OyezForm>
    )
  }

  return (
    <OyezForm title="Profile" authform>
      <p>{user.username}</p>
      {user.isAdmin && <p style={{ color: "darkblue "}}>You are admin!</p>}
    </OyezForm>
  )
}

export default Dashboard
