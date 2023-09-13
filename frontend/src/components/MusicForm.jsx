import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createMusic} from '../features/music/musicSlice'
// import { useSelector } from 'react-redux'


function MusicForm() {
    // const musics = useSelector(state => state.music.musics);
    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()

        dispatch(createMusic({text}))
        setText('')
    }

  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">SetList</label>
                <input 
                type="text" 
                name='text' 
                id='text' 
                value={text}
                onChange={(e) => setText(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <button className="btn btn-block" type='submit'>
                    Add Music
                </button>
            </div>
        </form>

        {/* Display the musics */}
      {/* <div>
        <h2>Music List</h2>
        <ul>
          {musics.map((music) => (
            <li key={music._id}>{music.text}</li>
          ))}
        </ul>
      </div> */}
    </section>
  )
}

export default MusicForm