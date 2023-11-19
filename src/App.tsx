import React, { useEffect, useRef, useState } from 'react';
import MainBlock from './components/ui/blocks/mainBlock/MainBlock';
import axios from 'axios';
import Layout from './components/Layout/Layout';
import Video from './static/media/qwe.mp4';
import { Reorder, motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setWords } from 'store/slices/dictionarySlice';
import classes from './App.module.scss';
function App() {
  const KEY =
    'dict.1.1.20231009T003419Z.59da905cfe137314.c40bb755827b88b24becea0d95068658e9dc2c76';

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3001/dictionary/words')
  //     .then((res) => dispatch(setWords(res.data)));
  // });
  // const test = () => {
  //   axios
  //     .post('http://localhost:3001/dictionary/words', { text: state })
  //     .then((res) => console.log(res.data))
  //     .catch((err) => err);
  // };
  // const [state, setState] = useState('');
  const isDragging = useAppSelector(
    (state) =>
      state.ui.multiTaskArea.modules.importantModule?.type === 'dropArea'
  );

  return (
    <div
      className={classes.wrapper}
      style={isDragging ? { cursor: 'grabbing' } : {}}
    >
      <Layout />
      <video
        id='video'
        autoPlay={true}
        loop
        muted
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          zIndex: -1,
          opacity: 0.5,
          filter: 'brightness(0.16) blur(30px)',
          objectFit: 'fill',
        }}
        src={Video}
      ></video>

      {/* <div>
        <input value={state} onChange={(e) => setState(e.target.value)} />
        <button onClick={test}>test</button>
      </div> */}
    </div>
  );
}

export default App;
