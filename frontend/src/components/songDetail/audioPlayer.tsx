/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react'
import DisplayTrack from './displayTrack'
import Controls from './controls'
import ProgressBar from './progressBar'
import getData from '../getData'

const AudioPlayer = () => {
  const [tracks, setTracks] = useState()
  useEffect(() => {
    getData(`http://localhost:8063/v1/song/list`).then((songData: any) => {
      setTracks(songData)
      setCurrentTrack(songData[0])
    })
  }, [])

  const [songId, setSongId] = useState(0)
  const [currentTrack, setCurrentTrack] = useState()
  const audioRef = useRef()
  const progressBarRef = useRef()
  const [timeProgress, setTimeProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  return (
    <div className='audio-player'>
      <div className='inner'>
        {currentTrack && audioRef && progressBarRef && (
          <DisplayTrack
            currentTrack={currentTrack}
            audioRef={audioRef}
            setDuration={setDuration}
            progressBarRef={progressBarRef}
          />
        )}
        {audioRef && progressBarRef && tracks && (
          <Controls
            {...{ audioRef, progressBarRef, duration, setTimeProgress, tracks, songId, setSongId, setCurrentTrack }}
          />
        )}
        {progressBarRef && audioRef && <ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration }} />}
      </div>
    </div>
  )
}
export default AudioPlayer
