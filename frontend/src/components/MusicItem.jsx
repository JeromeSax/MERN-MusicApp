import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMusic, updateMusic } from "../features/music/musicSlice";

function MusicItem({ music }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(music.text);
  // console.log(music.text)

  // Get user authentication state from Redux
  const isAuthenticated = useSelector((state) => state.auth.user !== null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(music.text);
  };

// Function to handle saved changes
  const handleSaveChanges = () => {
    if (!isAuthenticated) {
      // Handle authentication check here, e.g., show an error message or redirect to login
      console.error("User is not authenticated. Cannot update music.");
      return;
    }
    // console.log(music._id, editedText)
    dispatch(updateMusic(   {musicId: music._id, text: editedText} ));
    setIsEditing(false);
  };

//   const handleTextChange = (e) => {
//     setEditedText(e.target.value);
//   };

  return (
    <div className="music">
      <div>{new Date(music.createdAt).toLocaleString("en-US")}</div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) =>
            setEditedText(e.target.value)}
          />
          <button onClick={handleSaveChanges}>Save Changes</button>
          {/* <button onClick={handleCancelEdit}>Cancel</button> */}
        </>
      ) : (
        <>
          <h2>{editedText}</h2>
          <button onClick={() => dispatch(deleteMusic(music._id))} className="close">
            X
          </button>
          {isAuthenticated && (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </>
      )}
    </div>
  );
}

export default MusicItem;
