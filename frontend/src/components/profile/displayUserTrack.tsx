import { BsMusicNoteBeamed } from 'react-icons/bs'
import '../../assets/styles/app.css'
import { Card } from 'react-bootstrap'
/* eslint-disable jsx-a11y/media-has-caption */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DisplayUserTrack = (prop: any) => {
  const onLoadedMetadata = () => {
    const seconds = prop.audioRef.current.duration
    prop.setDuration(seconds)
    prop.progressBarRef.current.max = seconds
  }

  return (
    <Card style={{ width: '200px' }}>
      <audio
        src={'http://localhost:8063/' + prop.currentTrack.songUrl}
        ref={prop.audioRef}
        onLoadedMetadata={onLoadedMetadata}
      />
      <div className='audio-info'>
        <div>
          {prop.currentTrack.image ? (
            <img
              style={{ border: 'none', borderRadius: '0px' }}
              className='song-img'
              crossOrigin='anonymous'
              src={'http://localhost:8063/' + prop?.currentTrack.image}
              alt={prop?.currentTrack.name}
            />
          ) : (
            <div className='icon-wrapper'>
              <span className='audio-icon'>
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
export default DisplayUserTrack
