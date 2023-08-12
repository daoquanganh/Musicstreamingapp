/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import SongCard from '../main/introPage/songCard'
import DisplayArtist from '../sideBar/displayArtist'
import DisplayPlaylist from '../playlistDetail/displayPlaylist'
import { useDispatch } from 'react-redux'
import { addUser } from '../../reducers/userReducer'
import { Link } from 'react-router-dom'

interface SongInterface {
  id: number
  title: string
  category: string
  language: string
  image: string
  songUrl: string
}
interface UserInterface {
  id: number
  username: string
  follower: string
  tracks: string
  image: string
}
interface PlaylistInterface {
  id: number
  name: string
  image: string
  numberOfTracks: string
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function SearchBar() {
  const [songs, setSongs] = useState<SongInterface[]>()
  const [users, setUsers] = useState<UserInterface[]>()
  const [playlists, setPlaylists] = useState<PlaylistInterface[]>()
  const [query, setQuery] = useState('')
  const [checkRadio, setCheckRadio] = useState('song')
  const dispatch = useDispatch()

  function handleSearchSubmit() {
    fetch(`http://localhost:8063/v1/${checkRadio}/query=${query}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (checkRadio === 'song') {
          setUsers([])
          setPlaylists([])
          setSongs(data)
        } else if (checkRadio === 'user') {
          setSongs([])
          setPlaylists([])
          setUsers(data)
        } else {
          setSongs([])
          setUsers([])
          setPlaylists(data)
        }
      })
  }

  return (
    <div>
      <div className='sidebar'>
        <form className='search-filter-container'>
          <div className='radio'>
            <label>
              <input
                type='radio'
                value='song'
                checked={checkRadio === 'song'}
                onChange={(e: any) => {
                  setCheckRadio(e.target.value)
                }}
              />
              Tracks
            </label>
          </div>
          <div className='radio'>
            <label>
              <input
                type='radio'
                value='user'
                checked={checkRadio === 'user'}
                onChange={(e: any) => {
                  setCheckRadio(e.target.value)
                }}
              />
              People
            </label>
          </div>
          <div className='radio'>
            <label>
              <input
                type='radio'
                value='playlist'
                checked={checkRadio === 'playlist'}
                onChange={(e: any) => {
                  setCheckRadio(e.target.value)
                }}
              />
              Playlists
            </label>
          </div>
        </form>
      </div>
      <div className='search-container'>
        <Form>
          <FormControl
            required
            type='text'
            placeholder='Username'
            defaultValue='johndoe3'
            onChange={(e) => setQuery(e.target.value)}
            className='mr-sm-2'
          />
          <Button onClick={handleSearchSubmit} variant='outline-info'>
            Search
          </Button>
        </Form>
      </div>
      {songs &&
        songs?.map((song) => {
          // eslint-disable-next-line react/jsx-key
          return <SongCard song={song} key={song.id} />
        })}
      {users &&
        users?.map((user) => {
          return (
            <Link
              key={user.id}
              to='/user'
              onClick={() => {
                dispatch(addUser({ id: user.id }))
              }}
            >
              <DisplayArtist user={user} key={user.id} />
            </Link>
          )
        })}
      {playlists &&
        playlists?.map((playlist) => {
          return <DisplayPlaylist playlist={playlist} key={playlist.id} />
        })}
    </div>
  )
}

export default SearchBar
