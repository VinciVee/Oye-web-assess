import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FloatingLabel, Form, Button } from "react-bootstrap"
import Spinner from "react-bootstrap/Spinner"
import { toast } from 'react-toastify'
import axios from 'axios'

// Local Modules
import * as styles from './Login.css'
import OyeCard from '../../components/common/OyeCard'
import OyeButton from "../../components/common/OyeButton"
import { useAuth } from "../../contexts/AuthContext"

function Login() {
  const { loginSaveUser} = useAuth()
  // Link is used in html for clickable items that changes the view (or navigates to a different page) - without reloading the page
  // useNavigate is used programmatically (in code) for redirection
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
      const response = await axios.post('/api/auth/login', user)
      console.log(response.data)
      loginSaveUser(response.data)
      navigate('/dashboard')

    } catch(err){
      console.log(err?.response) // optional chaining '?'
      toast.error(err.response.data)
      setTimeout(() => {setLoading(false), 1000})
    }
  }

  return (
    <OyeCard title="Log in" authform>
      <Form onSubmit={handleSubmit}>
        {/* EMAIL */}
        <FloatingLabel
          controlId="email"
          label="Email address"
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
          label="Password"
          className="mb-3" >
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleTextChange}
              value={password} />
        </FloatingLabel>

        {/* SUBMIT BUTTON */}
        <OyeButton loadingState={loading}>
          {loading ? <Spinner animation="border" variant="light" /> : 'Submit'}
        </OyeButton>
      </Form>
      <div className={styles.userNav}>
        <span>Not a member? &nbsp;
          <Link to="/signup">Sign Up Here</Link>
        </span>
      </div>
    </OyeCard>
  )
}

export default Login
