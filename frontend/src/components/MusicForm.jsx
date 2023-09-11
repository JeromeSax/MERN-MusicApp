import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createMusic} from '../features/music/musicSlice'


function MusicForm() {
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
                <label htmlFor="text">Music</label>
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
    </section>
  )
}

export default MusicForm