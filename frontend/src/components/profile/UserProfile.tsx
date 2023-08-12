/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { RootState } from 'src/store'
import './UserProfile.css'
import { GeoAlt, PersonCircle, PersonPlus } from 'react-bootstrap-icons'
import { Button } from 'react-bootstrap'
import SongOfUser from './SongUser'
import '../../assets/styles/app.css'
import background from '../../assets/images/background.jpg'

interface UserInterface {
  id: number
  username: string
  follower: string
  track: string
  image: string
  songInfo: object
}
interface SongOfUserInterface {
  id: number
  title: string
  category: string
  language: string
  image: string
  songUrl: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function UserProfile() {
  // const [user, setUser] = useState<UserInterface[]>()
  const [infoUser, setInfoUser] = useState<UserInterface>()
  const [songOfUser, setSongOfUser] = useState<SongOfUserInterface[]>()

  // const userId = useSelector((state: RootState) => state.user.id)
  const userId = 1
  useEffect(() => {
    fetch(`http://localhost:8063/v1/songOfUser/userId${userId}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const songArray: SongOfUserInterface[] = []
        data.forEach((element: any) => {
          songArray.push(element.songInfo)
        })
        setSongOfUser(songArray)
      })
  }, [userId])
  useEffect(() => {
    fetch(`http://localhost:8063/v1/user/id${userId}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setInfoUser(data)
      })
  }, [userId])
  console.log(songOfUser)
  return (
    <div style={{ position: 'relative' }}>
      <img className='w-100 h-100' src={background} alt='background' style={{ opacity: 0.9 }}></img>
      <div className='user-form'>
        <div className='background-image-container container-lg'></div>
        <div className='overlay-items container-lg'>
          <div className='overlay-image-container'>
            <img
              className='overlay-image'
              src={'http://localhost:8063/' + infoUser?.image}
              alt={infoUser?.username}
            ></img>
          </div>
          <div className='overlay-user-infos'>
            <p style={{ color: 'lightgrey', fontStyle: 'italic' }}> @{infoUser?.username}</p>
            <div className='d-flex'>
              <PersonCircle color='lightgrey' className='me-2' />
              <p style={{ color: 'lightgrey', fontSize: '18px', marginBottom: '5px' }}> Hoang Le</p>
            </div>
            <div className='d-flex'>
              <GeoAlt color='lightgrey' className='me-2' />
              <p style={{ color: 'lightgrey', fontSize: '18px' }}> Da Nang, Viet Nam</p>
            </div>
            <Button className='d-flex overlay-button' style={{ backgroundColor: '#f50', margin: '10px' }}>
              <PersonPlus style={{ margin: '5px' }} />
              <p style={{ padding: '0px 5px 0px 5px', margin: '0px' }}>Follow</p>
            </Button>
          </div>
        </div>
        <div className='d-flex container-lg'>
          <div className='user-track-container'></div>
          <div
            style={{ color: 'grey', borderBottom: '0.5px solid lightgrey' }}
            className=' mx-4 additional-infos d-flex flex-grow-1 justify-content-between'
          >
            <div className='me-2 mt-5'>
              <p style={{ margin: '0px' }}>Follower</p>
              <p>{infoUser?.follower}</p>
            </div>
            <div className='me-2 mt-5'>
              <p style={{ margin: '0px' }}>Following</p>
              <p>{infoUser?.follower}</p>
            </div>
            <div className='me-2 mt-5'>
              <p style={{ margin: '0px' }}>Tracks</p>
              <p>{infoUser?.track}</p>
            </div>
          </div>
        </div>
        <div className='liked-tracks d-flex flex-column container-lg'>
          {songOfUser &&
            songOfUser.map((song) => {
              return (
                <div className='mb-2' key={song.id}>
                  <SongOfUser song={song} />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
