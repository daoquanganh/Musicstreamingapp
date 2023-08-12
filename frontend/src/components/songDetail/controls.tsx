/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, useCallback } from 'react'
import '../../assets/styles/app.css'
// icons
import { VolumeOff, VolumeUp, SkipBackward, SkipForward, SkipEnd, SkipStart, Play, Pause } from 'react-bootstrap-icons'

const Controls = (prop: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const [volume, setVolume] = useState(60)
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }
  useEffect(() => {
    if (prop.audioRef) {
      prop.audioRef.current.volume = volume / 100
    }
  }, [volume, prop.audioRef])
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

  const handleSkipBackward = () => {
    if (prop.songId === 0) {
      const lastSongId = prop.tracks.length - 1
      prop.setSongId(lastSongId)
      prop.setCurrentTrack(prop.tracks[lastSongId])
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prop.setSongId((prev: any) => prev - 1)
      prop.setCurrentTrack(prop.tracks[prop.songId - 1])
    }
  }

  const handlePrevious = () => {
    prop.audioRef.current.currentTime -= 15
  }

  const handleNext = () => {
    prop.audioRef.current.currentTime += 15
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
      <div className='controls'>
        <button onClick={handleSkipBackward}>
          <SkipBackward />
        </button>
        <button onClick={handlePrevious}>
          <SkipStart />
        </button>
        <button onClick={togglePlayPause}>{isPlaying ? <Pause /> : <Play />}</button>
        <button onClick={handleNext}>
          <SkipEnd />
        </button>
        <button onClick={handleSkipForward}>
          <SkipForward />
        </button>
      </div>
      <div className='volume'>
        <VolumeOff />
        <input
          type='range'
          min={0}
          max={100}
          value={volume}
          onChange={(e: any) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`
          }}
        />{' '}
        <VolumeUp />
      </div>
    </div>
  )
}

export default Controls
