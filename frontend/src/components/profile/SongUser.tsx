/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useState } from 'react'
import { HeartFill, ThreeDots } from 'react-bootstrap-icons'
import ProgressBar from '../songDetail/progressBar'
import SingleControl from './SingleControl'
import DisplayUserTrack from './displayUserTrack'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SongOfUser(prop: any) {
  const [currentTrack, setCurrentTrack] = useState(prop.song)
  const audioRef = useRef()
  const progressBarRef = useRef()
  const [timeProgress, setTimeProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  return (
    <div className='ms-2 d-flex mb-5'>
      {currentTrack && audioRef && progressBarRef && (
        <DisplayUserTrack
          currentTrack={currentTrack}
          audioRef={audioRef}
          setDuration={setDuration}
          progressBarRef={progressBarRef}
        />
      )}
      <div className='ms-4 d-flex flex-column' style={{ width: '600px' }}>
        {audioRef && progressBarRef && (
          <SingleControl {...{ audioRef, progressBarRef, duration, setTimeProgress, setCurrentTrack, currentTrack }} />
        )}
        {progressBarRef && audioRef && (
          <div className='w-100'>
            <ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration }} />
          </div>
        )}

        <div className='mt-auto'>
          <button>
            <HeartFill className='button-small' size={22} color='black' />
          </button>
          <button>
            <ThreeDots className='button-small' size={22} color='black' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SongOfUser
