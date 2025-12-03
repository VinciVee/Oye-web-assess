import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FloatingLabel, Form, Button } from "react-bootstrap"
import Spinner from "react-bootstrap/Spinner"

// Local Modules
import * as styles from './Login.css'
import OyezForm from '../../components/common/OyezForm'
import OyezButton from "../../components/common/OyezButton"
import useAuth from "../../hooks/useAuth"
import authService from "../../services/authService"

function Login() {
  const { loginSaveUser } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const { email, password } = user
  const [loading, setLoading ] = useState(false)

  // Function: handleTextChange
  const handleTextChange = (e) => {
    setUser({
      ...user,
      // for this to work, name of attribute (in Form) needs to be the same as name of variable in user.
      [e.target.name]: e.target.value
    })
  }

  // Function: handleSubmit
  const handleSubmit = async (e) => {
    // Disable default behaviour of submit button
    e.preventDefault()
    setLoading(true)

    // API call
    try {
      const response = await authService.login(user)
      loginSaveUser(response.data)
      navigate('/dashboard')

    } catch(err){
      setTimeout(() => {setLoading(false), 1000})
    }
  }

  return (
    <OyezForm title="Log in" authform>
      <Form onSubmit={handleSubmit} className={styles.formBox}>
        {/* EMAIL */}
        <FloatingLabel
          controlId="email"
          label="Email address*"
          className="mb-3" >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
              onChange={handleTextChange}
              value={email} />
        </FloatingLabel>

        {/* PASSWORD */}
        <FloatingLabel
          controlId="password"
          label="Password*"
          className="mb-3" >
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleTextChange}
              value={password} />
        </FloatingLabel>

        {/* SUBMIT BUTTON */}
        <OyezButton loadingState={loading}>
          {loading ? <Spinner animation="border" variant="light" /> : 'Submit'}
        </OyezButton>
      </Form>
      <div className={styles.userNav}>
        <span>Not a member? &nbsp;
          <Link to="/signup">Sign Up Here</Link>
        </span>
      </div>
    </OyezForm>
  )
}

export default Login
