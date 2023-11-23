import { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Video from './static/media/qwe.mp4';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import classes from './App.module.scss';
import axios from 'axios';
import { setAuth } from 'store/slices/userSlice';
function App() {
  const KEY =
    'dict.1.1.20231009T003419Z.59da905cfe137314.c40bb755827b88b24becea0d95068658e9dc2c76';

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`http://localhost:3001/user/auth?token=${token}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => dispatch(setAuth(true)))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

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

  // useEffect(() => {}, []);

  const isDragging = useAppSelector(
    (state) =>
      state.ui.multiTaskArea.widgets.importantWidget?.type === 'dropArea'
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
