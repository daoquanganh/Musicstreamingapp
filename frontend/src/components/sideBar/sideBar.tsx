import { PeopleFill, HeartFill, Calendar2EventFill } from 'react-bootstrap-icons'
import './sidebar.css'
import { useEffect, useState } from 'react'
import getData from '../getData'
import DisplayArtist from './displayArtist'
// eslint-disable-next-line react/display-name
interface UserInterface {
  id: number
  username: string
  image: string
  follower: number
  track: number
}

function SideBar() {
  const [artists, setArtists] = useState<UserInterface[]>()
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getData(`http://localhost:8063/v1/user/list`).then((artistData: any) => {
      setArtists(artistData)
    })
  }, [])
  return (
    <div className='sidebar-container' style={{ width: '50vh', height: '100vh', position: 'absolute', right: 0 }}>
      <div>
        <div key='artist'>
          <PeopleFill className='sidebar-items' />
          Artists you should follow <hr></hr>
          {artists &&
            artists?.map((user) => {
              // eslint-disable-next-line react/jsx-key
              return <DisplayArtist user={user} key={user.id} />
            })}
        </div>
        <div key='liked'>
          <HeartFill className='sidebar-items' />
          Liked artists<hr></hr>
        </div>
        <div key='history'>
          <Calendar2EventFill className='sidebar-items' />
          Listening History<hr></hr>
        </div>
      </div>
    </div>
  )
}

export default SideBar
