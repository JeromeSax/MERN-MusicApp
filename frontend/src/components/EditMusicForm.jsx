// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { updateMusic } from '../features/music/musicSlice';

// function EditMusicForm({ music }) {
//   const [text, setText] = useState(music.text);
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(updateMusic({ id: music._id, text }));
//   };

//   return (
//     <section className='form'>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="text">Music</label>
//           <input 
//             type="text" 
//             name='text' 
//             id='text' 
//             value={text}
//             onChange={(e) => setText(e.target.value)} 
//           />
//         </div>
//         <div className="form-group">
//           <button className="btn btn-block" type='submit'>
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// }

// export default EditMusicForm;
