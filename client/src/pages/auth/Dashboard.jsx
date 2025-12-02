import useAuth from "../../hooks/useAuth"
import OyezForm from "../../components/common/OyezForm"
import OyezLoader from "../../components/common/OyezLoader"
import { Card } from "react-bootstrap"

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
    <OyezForm title={`Welcome ${user.username}`} authform>
      <Card style={{ width: '18rem' }}>
        <Card.Header>Profile</Card.Header>
        <Card.Img variant="top" src={user.image} />
        <Card.Body>
          <Card.Title>{user.username}</Card.Title>
          <Card.Text>
            {user.isAdmin ? "Admin" : "User" }
          </Card.Text>
        </Card.Body>
      </Card>
    </OyezForm>
  )
}

export default Dashboard
