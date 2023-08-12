import OtpInput from 'react-otp-input'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import postData from '../postData'
import { deleteUser } from '../../reducers/userReducer'
import '../../assets/styles/app.css'
import background from '../../assets/images/background.jpg'

function OTP() {
  const [otp, setOtp] = useState('')
  const userId = useSelector((state: RootState) => state.user.id)
  const [validated, setValidated] = useState(false)
  const [resendOTP, setResendOTP] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: any) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      event.stopPropagation()
      postData('http://localhost:8063/v1/auth/verify', { userId, otp }).then((res) => {
        console.log(res)
        if (res.status === 'VERIFIED') {
          dispatch(deleteUser({ id: userId }))
          navigate('/login')
        } else {
          // hien thong bao sai ma
          alert('Invalid Credentials')
        }
      })
    }
    setValidated(true)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResendOTP = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    postData('http://localhost:8063/v1/auth/resendOTP', { userId, otp }).then((data) => {
      console.log(data)
    })
    setResendOTP(true)
  }
  return (
    <div className='form-container' style={{ position: 'relative' }}>
      <img className='w-100 h-100' src={background} alt='background' style={{ opacity: 0.85 }}></img>
      <Form className='otp-form' noValidate validated={validated}>
        <h1 style={{ textAlign: 'center', margin: '5px' }}> OTP Verification </h1>
        <div style={{ margin: '10px' }}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span className='m-3'> - </span>}
            renderInput={(props) => <input {...props} style={{ width: '100%' }} />}
          />
        </div>

        <div className='d-flex justify-content-between'>
          <div>
            <Button type='submit' onClick={handleSubmit} style={{ backgroundColor: '#f50', border: 'none' }}>
              Submit form
            </Button>
            <Form.Control.Feedback type='invalid'>Wrong otp</Form.Control.Feedback>
          </div>
          <div>
            <Button type='submit' onClick={handleResendOTP} style={{ backgroundColor: '#f50', border: 'none' }}>
              Resend OTP
            </Button>
            {resendOTP && (
              <Form.Text className='text-muted'>
                <p>OTP resent</p>
              </Form.Text>
            )}
          </div>
        </div>
      </Form>
    </div>
  )
}
export default OTP
