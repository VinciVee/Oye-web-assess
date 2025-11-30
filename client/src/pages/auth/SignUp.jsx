import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FloatingLabel, Form, Button } from "react-bootstrap"
import Spinner from "react-bootstrap/Spinner"
import { toast } from 'react-toastify'

// Local Modules
import * as styles from './SignUp.css'
import OyezForm from '../../components/common/OyezForm'
import OyezButton from "../../components/common/OyezButton"
import useAuth from "../../hooks/useAuth"
import authService from "../../services/authService"

function SignUp() {
  const { loginSaveUser } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const { username, email, password } = user
  const [loading, setLoading ] = useState(false)
  // useRef maintains the value (of passwordConfirmRef in that case)
  // useRef does not rerender the page, as useState would
  const passwordConfirmRef = useRef()

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

    // Client-side validation (wrong pwds)
    if(password != passwordConfirmRef.current.value){
      // If password DOES NOT match passwordConf., trigger this
      toast.warn("Passwords do not match")
      setLoading(false)

      return
    }

    // API call
    try {
      const response = await authService.register(user)
      loginSaveUser(response.data)
      navigate('/dashboard')

    } catch(err){
      setTimeout(() => {setLoading(false), 1000})
    }
  }

  return (
    <OyezForm title="Sign Up" authform>
      <Form onSubmit={handleSubmit}>
        {/* USERNAME */}
        <FloatingLabel
          controlId="username"
          label="Username*"
          className="mb-3" >
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleTextChange}
              value={username} />
        </FloatingLabel>

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

        {/* PASSWORD CONFIRMATION */}
        <FloatingLabel
          controlId="password-confirm"
          label="Password Confirmation*"
          className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password Confirmation"
              ref={passwordConfirmRef} />
        </FloatingLabel>

        {/* SUBMIT BUTTON */}
        <OyezButton loadingState={loading}>
          {loading ? <Spinner animation="border" variant="light" /> : 'Submit'}
        </OyezButton>
      </Form>
      <div className={styles.userNav}>
        <span>Already a member? &nbsp;
          <Link to="/login">Login Here</Link>
        </span>
      </div>
    </OyezForm>
  )
}

export default SignUp
