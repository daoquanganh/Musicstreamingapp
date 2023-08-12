/* eslint-disable jsx-a11y/media-has-caption */
import Card from 'react-bootstrap/Card'
import { PlayCircle, HeartFill, ThreeDots } from 'react-bootstrap-icons'
import './introPage.css'
import { Col } from 'react-bootstrap'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SongCard(prop: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handlePlay(event: any) {
    event.preventDefault()
    const audio = new Audio('http://localhost:8063/' + prop?.song.songUrl)
    audio.play()
  }

  return (
    <Col className='song-container' key={prop?.song.id}>
      <Card className='text-white img-container'>
        <Card.Img
          className='song-img'
          variant='top'
          crossOrigin='anonymous'
          src={'http://localhost:8063/' + prop?.song.image}
          alt={prop?.song.name}
        />
        <Card.ImgOverlay>
          <div className='overlay-items'>
            <button className='button-overlay' onClick={handlePlay}>
              <PlayCircle size={18} />
            </button>
            <div className='overlay-bar'>
              <button className='button-overlay'>
                <HeartFill />
              </button>
              <button className='button-overlay'>
                <ThreeDots />
              </button>
            </div>
          </div>
        </Card.ImgOverlay>
      </Card>
    </Col>
  )
}

export default SongCard
