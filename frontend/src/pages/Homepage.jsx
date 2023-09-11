import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MusicForm from "../components/MusicForm"
import MusicItem from "../components/MusicItem"
import Spinner from '../components/Spinner'
import {getMusics, reset} from '../features/music/musicSlice'


function Homepage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const {musics, isLoading, isError, message} = useSelector((state) => state.music);

  useEffect(() => {
    if(!user){
        navigate("/login")
    }
    else{
        dispatch(getMusics())
    }
    
    if(isError){
       console.log("Error")
    }
    
    return () => {
       dispatch(reset())
    }
    }, [user, message, isError, dispatch, navigate])

  if (isLoading) {
    return <Spinner />
  }

  return (
  <>
    <section className="heading">
      <h1>Welcome {user && user.name}</h1>
      <p>Music Homepage</p>
    </section>
    <MusicForm />

    <section className="content">
      {musics.length > 0 ? (
        <div className="music">
          {musics.map((music) => (
            <MusicItem key={music._id} music={music} />
          ))}
        </div>
      ) : (
      <h3>You have not created a setlist</h3>)}
    </section>
  </>
  )
}

export default Homepage