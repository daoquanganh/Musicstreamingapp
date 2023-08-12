import { BsMusicNoteBeamed } from 'react-icons/bs'
import '../../assets/styles/app.css'
import { Card } from 'react-bootstrap'
/* eslint-disable jsx-a11y/media-has-caption */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DisplayTrack = (prop: any) => {
  const onLoadedMetadata = () => {
    const seconds = prop.audioRef.current.duration
    prop.setDuration(seconds)
    prop.progressBarRef.current.max = seconds
  }
  const handleSkipForward = () => {
    if (prop.songId >= prop.tracks.length - 1) {
      prop.setSongId(0)
      prop.setCurrentTrack(prop.tracks[0])
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prop.setSongId((prev: any) => prev + 1)
      prop.setCurrentTrack(prop.tracks[prop.songId + 1])
    }
  }

  return (
    <Card className='img-container'>
      <audio
        src={'http://localhost:8063/' + prop.currentTrack.songUrl}
        ref={prop.audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleSkipForward}
      />
      <div className='audio-info'>
        <div>
          {prop.currentTrack.image ? (
            <img className='song-img' src={'http://localhost:8063/' + prop.currentTrack.image} alt='audio avatar' />
          ) : (
            <div className='icon-wrapper'>
              <span className='audio-icon'>
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div className='text-black'>
          <p className='title'>{prop.currentTrack.title}</p>
          <p>{prop.currentTrack.language}</p>
        </div>
      </div>
    </Card>
  )
}
export default DisplayTrack
