import React from 'react';
import classes from './Layout.module.scss';
import MainBlock from '../ui/blocks/mainBlock/MainBlock';
import { AiOutlineSetting } from 'react-icons/ai';
import MiniProfile from '../miniProfile/MiniProfile';
import Dictionary from 'components/dictionary/Dictionary';
import { motion } from 'framer-motion';
import MultiTaskArea from 'components/multiTaskArea/MultiTaskArea';
import {
  createBrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import Learning from 'components/learning/Learning';

type Props = {};
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Dictionary />,
//   },
//   { path: 'learning', element: <Learning /> },
// ]);
const Layout = (props: Props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.main}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className={[classes.block, classes.titleWrapper].join(' ')}
          transition={{ delay: 0.1, type: 'spring' }}
        >
          <h1 className={classes.title}>VOCK</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className={classes.block}
          transition={{ delay: 0.1, type: 'spring' }}
        >
          <MiniProfile />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className={classes.block}
          style={{ zIndex: 10 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <Routes>
            <Route path='/' element={<Dictionary />} />
            <Route path='learning' element={<Learning />} />
          </Routes>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className={classes.block}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <MultiTaskArea />
        </motion.div>
      </div>
    </div>
  );
};

export default Layout;
