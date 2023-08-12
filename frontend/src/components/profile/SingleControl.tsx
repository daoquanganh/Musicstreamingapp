/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react'
import '../../assets/styles/app.css'
// icons
import { PlayCircleFill, PauseCircleFill } from 'react-bootstrap-icons'

const SingleControl = (prop: any) => {
  const playAnimationRef: any = useRef()
  const repeat = useCallback(() => {
    const currentTime = prop.audioRef.current.currentTime
    prop.setTimeProgress(currentTime)
    prop.progressBarRef.current.value = currentTime
    prop.progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(prop.progressBarRef.current.value / prop.duration) * 100}%`
    )
    playAnimationRef.current = requestAnimationFrame(repeat)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop.audioRef, prop.duration, prop.progressBarRef, prop.setTimeProgress])
  const [isPlaying, setIsPlaying] = useState(false)
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }
  useEffect(() => {
    if (isPlaying) {
      prop.audioRef.current.play()
    } else {
      prop.audioRef.current.pause()
    }
    playAnimationRef.current = requestAnimationFrame(repeat)
  }, [isPlaying, prop.audioRef, repeat])
  return (
    <div className='controls-wrapper'>
      <div className='controls d-flex'>
        <button onClick={togglePlayPause}>
          {isPlaying ? (
            <div className='button-overlay'>
              <PauseCircleFill size={35} color='#f50' />
            </div>
          ) : (
            <div className='button-overlay'>
              <PlayCircleFill size={35} color='#f50' />
            </div>
          )}
        </button>
        <div>
          <p style={{ fontSize: '13px', color: 'lightgrey', marginBottom: '3px' }}>kitchenpeach</p>
          <p style={{ fontSize: '15px', color: 'black' }} className='title'>
            {prop.currentTrack.title}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SingleControl
