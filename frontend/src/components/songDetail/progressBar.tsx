import moment from 'moment'
import './songDetail.css'
import './progressBar.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProgressBar = (prop: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatTime = (rawTime: any) => {
    const time = moment.duration(rawTime, 'seconds')
    const format = Math.floor(time.asMinutes()) + ':' + time.seconds()
    return format
  }
  const handleProgressChange = () => {
    prop.audioRef.current.currentTime = prop.progressBarRef.current.value
  }
  return (
    <div style={{ position: 'relative' }}>
      <div id='bars' style={{ position: 'absolute' }}>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
      </div>
      <div style={{ minHeight: '50px' }}></div>
      <span className='time current'>{formatTime(prop.timeProgress)}</span>
      <input
        style={{ backgroundSize: `100%` }}
        className='input-range'
        type='range'
        ref={prop.progressBarRef}
        defaultValue='0'
        onChange={handleProgressChange}
      />
      <span className='time'>{formatTime(prop.duration)}</span>
    </div>
  )
}

export default ProgressBar
