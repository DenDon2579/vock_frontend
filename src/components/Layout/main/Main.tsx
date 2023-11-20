import React from 'react';
import classes from './Main.module.scss';
import { motion } from 'framer-motion';
import MiniProfile from 'components/miniProfile/MiniProfile';
import Dictionary from 'components/dictionary/Dictionary';
import Learning from 'components/learning/Learning';
import { Navigate, Route, Routes } from 'react-router-dom';
import MultiTaskArea from 'components/multiTaskArea/MultiTaskArea';

type Props = {};

const Main = (props: Props) => {
  return (
    <div className={classes.wrapper}>
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
          <Route path='dictionary' element={<Dictionary />} />
          <Route path='learning' element={<Learning />} />
          <Route path='/' element={<Navigate to='dictionary' />} />
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
  );
};

export default Main;
