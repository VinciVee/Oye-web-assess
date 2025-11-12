import { Link } from "react-router-dom"
import { FloatingLabel, Form, Button } from "react-bootstrap"

// Local Modules
import * as styles from './SignUp.css'
import OyeCard from '../../components/common/OyeCard'
import OyeButton from "../../components/common/OyeButton"

function SignUp() {
  return (
    <OyeCard title="Sign Up" authform>
      {/* FORM TBC */}
      <Form>
        <FloatingLabel
          controlId="floatingUsername"
          label="Username"
          className="mb-3"
        >
            <Form.Control type="text" placeholder="Username" />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingEmail"
          label="Email address"
          className="mb-3"
        >
            <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="mb-3"
        >
            <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingConfirmPassword"
          label="Password Confirmation"
          className="mb-3"
        >
            <Form.Control type="password" placeholder="Confirm Password" />
        </FloatingLabel>
        <Button as="input" type="button" value="Submit" />
      </Form>
      <div className={styles.userNav}>
        <span>Already a member? &nbsp;
          <Link to="/login">Login Here</Link>
        </span>
      </div>
    </OyeCard>
  )
}

export default SignUp
