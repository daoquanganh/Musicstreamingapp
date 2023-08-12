import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import SongCard from './introPage/songCard'
import AudioPlayer from '../songDetail/audioPlayer'
import SideBar from '../sideBar/sideBar'
import '../../assets/styles/app.css'
interface SongInterface {
  id: number
  title: string
  category: string
  language: string
  image: string
  songUrl: string
}
function Main() {
  // const [validated, setValidated] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [songs, setSongs] = useState<SongInterface[]>()

  useEffect(() => {
    fetch(`http://localhost:8063/v1/song/list`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((songData) => {
        setSongs(songData)
      })
  }, [])
  return (
    <div className='main'>
      <SideBar key='sidebar' />
      <Container>
        <Row>
          {songs &&
            songs?.map((song) => {
              // eslint-disable-next-line react/jsx-key
              return <SongCard song={song} key={song.id} />
            })}
        </Row>
      </Container>
      <AudioPlayer />
    </div>
  )
}
export default Main
