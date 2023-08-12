import { useState } from 'react'
import postData from '../postData'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { addToken } from '../../reducers/tokenReducer'
import { useNavigate } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import '../../assets/styles/app.css'
import background from '../../assets/images/background.jpg'

function Login() {
  const [validated, setValidated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [checkCredential, setCheckCredential] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: any) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      setCheckCredential(false)
      event.preventDefault()
      event.stopPropagation()
      postData('http://localhost:8063/v1/auth/login', { username, password }).then((data) => {
        if (data.accessToken && username) {
          const tokenData = { token: data.accessToken, username: username }
          dispatch(addToken(tokenData))
          console.log(tokenData)
          setValidated(true)
          navigate('/main')
          event.preventDefault()
          event.stopPropagation()
        } else {
          event.preventDefault()
          event.stopPropagation()
          setCheckCredential(true)
        }
      })
    }
  }

  return (
    <div>
      <div className='form-container' style={{ position: 'relative' }}>
        <img className='w-100 h-100' src={background} alt='background' style={{ opacity: 0.85 }}></img>
        <Form className='otp-form' noValidate validated={validated} onSubmit={handleSubmit}>
          <h1 style={{ textAlign: 'center', margin: '5px' }}> Login </h1>

          <Col className='mb-3'>
            <Form.Group as={Col} md='4' controlId='validationCustom01' className='input-form'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Username'
                defaultValue='johndoe3'
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='4' controlId='validationCustom02' className='input-form'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={checkCredential}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Email or password is incorrect</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <div className='button-container'>
            <Button type='submit' style={{ backgroundColor: '#f50', border: 'none' }}>
              Submit form
            </Button>
            <Form.Control.Feedback type='invalid'>Invalid credentials</Form.Control.Feedback>
            <Form.Text className='text-muted'>
              <a href='/register' style={{ color: '#f50', fontStyle: 'italic', textDecoration: 'none' }}>
                Didnt have an account yet?
              </a>
            </Form.Text>
          </div>
        </Form>
      </div>
    </div>
  )
}
export default Login
