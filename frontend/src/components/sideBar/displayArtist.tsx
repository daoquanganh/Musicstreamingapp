import { PeopleFill, Soundwave, PersonPlusFill } from 'react-bootstrap-icons'
import '../../assets/styles/app.css'
/* eslint-disable jsx-a11y/media-has-caption */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DisplayArtist = (prop: any) => {
  return (
    <div className='sidebar-artist-container'>
      <div className='sidebar-artist-avi'>
        <img src={'http://localhost:8063/' + prop?.user.image} alt={prop?.user.name}></img>
      </div>
      <div className='sidebar-artist-info'>
        <div className='sidebar-artist-name'>{prop?.user.name}</div>
        <div className='sidebar-artist-others'>
          <div className='sidebar-artist-followers'>
            <PeopleFill />
            {prop?.user.follower}
          </div>
          <div className='sidebar-artist-tracks'>
            <Soundwave />
            {prop?.user.track}
          </div>
          <button className='sidebar-artist-button'>
            <PersonPlusFill />
            Follow
          </button>
        </div>
      </div>
    </div>
  )
}
export default DisplayArtist
