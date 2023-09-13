import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMusician } from '../features/music/musicSlice';

const MusicianForm = () => {
  const [name, setName] = useState('');
  const [instrument, setInstrument] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createMusician({ name, instrument }));
    setName('');
    setInstrument('');
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Band Members</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="instrument">Instrument</label>
          <input
            type="text"
            name="instrument"
            id="instrument"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Musician
          </button>
        </div>
      </form>
    </section>
  );
};

export default MusicianForm;
