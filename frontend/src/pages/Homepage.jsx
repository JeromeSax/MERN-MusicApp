import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MusicForm from "../components/MusicForm";
import MusicItem from "../components/MusicItem";
import MusicianForm from "../components/MusicianForm";
import EditMusicForm from "../components/EditMusicForm";  // Added import

import Spinner from '../components/Spinner';
import { getMusics, reset } from '../features/music/musicSlice';

function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { musics, isLoading, isError, message } = useSelector((state) => state.music);

  const [editMode, setEditMode] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getMusics());
    }

    if (isError) {
      console.log("Error");
    }

    return () => {
      dispatch(reset());
    }
  }, [user, message, isError, dispatch, navigate]);

  const handleEditClick = (music) => {
    setSelectedMusic(music);
    setEditMode(true);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Gig Homepage</p>
      </section>
      <div className="form-container">
        <MusicForm />
        <MusicianForm />
      </div>

      <section className="content">
        {editMode ? (
          <EditMusicForm music={selectedMusic} setEditMode={setEditMode} />
        ) : (
          musics.length > 0 ? (
            <div className="music">
              {musics.map((music) => (
                <MusicItem
                  key={music._id}
                  music={music}
                  onEdit={() => handleEditClick(music)}
                />
              ))}
            </div>
          ) : (
            <h3>You have not organized your Gig</h3>
          )
        )}
      </section>
    </>
  );
}

export default Homepage;
