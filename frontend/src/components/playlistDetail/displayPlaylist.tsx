import { PeopleFill, Soundwave, PersonPlusFill } from 'react-bootstrap-icons'
import '../../assets/styles/app.css'
/* eslint-disable jsx-a11y/media-has-caption */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DisplayPlaylist = (prop: any) => {
  return (
    <div className='sidebar-playlist-container'>
      <div className='sidebar-playlist-avi'>
        <img src={'http://localhost:8063/' + prop?.playlist.image} alt={prop?.playlist.name}></img>
      </div>
      <div className='sidebar-playlist-info'>
        <div className='sidebar-playlist-name'>{prop?.playlist.name}</div>
        <div className='sidebar-playlist-others'>
          <div className='sidebar-playlist-followers'>
            <PeopleFill />
            {/* {prop?.playlist.follower} */}
          </div>
          <div className='sidebar-playlist-tracks'>
            <Soundwave />
            {/* {prop?.playlist.track} */}
          </div>
          <button className='sidebar-playlist-button'>
            <PersonPlusFill />
            Follow
          </button>
        </div>
      </div>
    </div>
  )
}
export default DisplayPlaylist
