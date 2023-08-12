import { useState } from 'react'
import postData from '../postData'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import { addUser } from '../../reducers/userReducer'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import '../../assets/styles/app.css'
import background from '../../assets/images/background.jpg'

function Register() {
  const [validated, setValidated] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isBlankUsername, setIsBlankUsername] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: any) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      event.stopPropagation()
      postData('http://localhost:8063/v1/auth/register', { username, email, password }).then((res) => {
        console.log(res)
        setUsernameError(false)
        setEmailError(false)
        if (res.usernameError) {
          setUsernameError(true)
          event.preventDefault()
          event.stopPropagation()
        }
        if (res.emailError) {
          setEmailError(true)
          event.preventDefault()
          event.stopPropagation()
        }
        if (res.status === 'PENDING') {
          console.log(res.data.id)
          // const user = { id: res.data.id, email: res.data.email }
          dispatch(addUser({ id: res.data.id }))
          setValidated(true)
          navigate('/verify')
        } else {
          event.preventDefault()
          event.stopPropagation()
        }
      })
    }
  }

  return (
    <div className='form-container' style={{ position: 'relative' }}>
      <img className='w-100 h-100' src={background} alt='background' style={{ opacity: 0.85 }}></img>
      <Form className='otp-form' noValidate validated={validated} onSubmit={handleSubmit}>
        <h1 style={{ textAlign: 'center', margin: '5px' }}> Register </h1>
        <Col className='mb-3'>
          <Form.Group as={Col} md='4' controlId='validationCustomUsername' className='input-form'>
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id='inputGroupPrepend'>@</InputGroup.Text>
              <Form.Control
                type='text'
                placeholder='Username'
                aria-describedby='inputGroupPrepend'
                required
                onBlur={(e) => {
                  setUsername(e.target.value)
                  setIsBlankUsername(e.target.value.length == 0)
                }}
                isInvalid={usernameError || isBlankUsername}
              />
              {isBlankUsername && (
                <Form.Control.Feedback type='invalid'>Please choose a username.</Form.Control.Feedback>
              )}
              {usernameError && (
                <Form.Control.Feedback type='invalid'>
                  User with specified username already exists
                </Form.Control.Feedback>
              )}
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md='4' controlId='validationFormik01' className='input-form'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Email address'
              defaultValue='example@gmail.com'
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={emailError}
            />
            {!emailError && <Form.Control.Feedback>Looks good!</Form.Control.Feedback>}
            {emailError && (
              <Form.Control.Feedback type='invalid'>User with specified email already exists</Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group as={Col} md='4' controlId='validationFormik02' className='input-form'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Password'
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='4' controlId='validationFormik03' className='input-form'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Confirm Password'
              onChange={(e) => {
                setCheckConfirmPassword(e.target.value === password)
              }}
              isInvalid={!checkConfirmPassword}
            />
            {checkConfirmPassword && <Form.Control.Feedback>Looks good!</Form.Control.Feedback>}
            {!checkConfirmPassword && (
              <Form.Control.Feedback type='invalid'>Confirm password has to match your password</Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Form.Group className='mb-3'>
          {/* <Form.Check
            style={{ accentColor: '#f50', border: 'none' }}
            required
            label='Agree to terms and conditions'
            feedback='You must agree before submitting.'
            feedbackType='invalid'
          /> */}
        </Form.Group>
        <Button type='submit' style={{ backgroundColor: '#f50', border: 'none' }}>
          Register
        </Button>
      </Form>
    </div>
  )
}
export default Register
