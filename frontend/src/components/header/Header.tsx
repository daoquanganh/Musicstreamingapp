import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { deleteToken } from '../../reducers/tokenReducer'
import Nav from 'react-bootstrap/Nav'
import { ButtonGroup, Container, Dropdown, NavDropdown, Navbar } from 'react-bootstrap'
import { RootState } from 'src/store'
// import SearchBar from './Search'
import { useNavigate } from 'react-router-dom'
import './header.css'
import '../../assets/styles/app.css'
import logo from '../../assets/images/logo.png'
interface userData {
  username: string
  image: string
}
function Header() {
  const [userData, setUserData] = useState<userData>()
  const accessToken = useSelector((state: RootState) => state.token.token)
  const username = useSelector((state: RootState) => state.token.username)
  console.log(accessToken)
  if (accessToken) localStorage.setItem('accessToken', accessToken)
  if (username) localStorage.setItem('username', username)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    fetch(`http://localhost:8063/v1/user/profile/${localStorage.getItem('username')}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem('username'), localStorage.getItem('accessToken')])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogOut = (token: any, username: any) => {
    dispatch(deleteToken({ token, username }))
    if (localStorage.getItem('accessToken')) localStorage.removeItem('accessToken')
    navigate('/login')
  }

  return (
    <div style={{ fontFamily: '0' }}>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/main'>
            <img src={logo} alt='logo' style={{ height: '40px' }}></img>
          </Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href='/main'>Home</Nav.Link>
            <Nav.Link>About us</Nav.Link>
            <Nav.Link>Playlists</Nav.Link>
            {localStorage.getItem('accessToken') && <Nav.Link href='/search'></Nav.Link>}
            {!localStorage.getItem('accessToken') && <Nav.Link href='/register'>Sign up</Nav.Link>}
            {!localStorage.getItem('accessToken') && <Nav.Link href='/login'>Log in</Nav.Link>}
            {localStorage.getItem('accessToken') && (
              <Dropdown as={ButtonGroup} className='justify-content-end'>
                <Dropdown.Toggle
                  id='dropdown-custom-2'
                  style={{ display: 'inline-block', backgroundColor: '#f50', border: 'none', width: '70px' }}
                >
                  <img
                    className='searchbar-img'
                    src={'http://localhost:8063/' + userData?.image}
                    alt='profile pic'
                  ></img>
                </Dropdown.Toggle>
                <Dropdown.Menu className='super-colors'>
                  <NavDropdown.Item>About us</NavDropdown.Item>
                  <NavDropdown.Item href='#action/3.2'>Settings</NavDropdown.Item>
                  <NavDropdown.Item href='#action/3.3'>Copyright</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <button
                      type='submit'
                      onClick={(e) => {
                        e.preventDefault()
                        handleLogOut(localStorage.getItem('accessToken'), localStorage.getItem('username'))
                      }}
                    >
                      Log out
                    </button>
                  </NavDropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            {!localStorage.getItem('accessToken') && (
              <NavDropdown id='nav-dropdown-dark-example' title='Dropdown' menuVariant='dark'>
                <NavDropdown.Item>About us</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>Settings</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>Copyright</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <button
                    type='submit'
                    onClick={(e) => {
                      e.preventDefault()
                      handleLogOut(accessToken, username)
                    }}
                  >
                    Log out
                  </button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}
export default Header
