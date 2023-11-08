import React, { useEffect, useRef, useState } from 'react';
import MainBlock from './components/ui/blocks/mainBlock/MainBlock';
import axios from 'axios';
import Layout from './components/Layout/Layout';
import Video from './static/media/qwe.mp4';
import { motion } from 'framer-motion';
import { useAppSelector } from 'hooks/redux';

function App() {
  const KEY =
    'dict.1.1.20231009T003419Z.59da905cfe137314.c40bb755827b88b24becea0d95068658e9dc2c76';
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // document.addEventListener('mousemove', (e) => {
  //   setCursorPos({ x: e.clientX, y: e.clientY });
  // });
  // useEffect(() => {
  //   const video: any = document.getElementById('video');
  //   video.playbackRate = cursorPos.y / 1000 + 0.5;
  // });
  const isDragging = useAppSelector(
    (state) =>
      state.ui.multiTaskArea.modules.importantModule?.type === 'dropArea'
  );
  return (
    <div style={isDragging ? { cursor: 'grabbing' } : {}}>
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
          filter: 'brightness(0.08) blur(25px)',
          objectFit: 'fill',
        }}
        src={Video}
      ></video>

      {/* <div>
        <input value={state} onChange={(e) => setState(e.target.value)} />
        <button onClick={getg}>Кукуку</button>
      </div> */}
    </div>
  );
}

export default App;
