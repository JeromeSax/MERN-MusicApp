import {useDispatch} from 'react-redux'
import { deleteMusic } from '../features/music/musicSlice'

function MusicItem({ music }) {
  const dispatch = useDispatch()

  return (
    <div className="music">
        <div>{new Date(music.createdAt).toLocaleString
            ('en-US')}</div>
            <h2>{music.text}</h2>
            <button onClick={() => dispatch(deleteMusic(music.
            _id))} className="close">X</button>
    </div>
  )
}

export default MusicItem