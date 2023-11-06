import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import classes from './MultiTaskArea.module.scss';
import MainBlock from 'components/ui/blocks/MainBlock';
import { useAppSelector } from 'hooks/redux';
import { AnimatePresence, motion } from 'framer-motion';

const StartLearningButton = () => {
  return (
    <MainBlock
      className={classes.startLearningButton}
      w='auto'
      h='auto'
      type='gradient'
    >
      <span className={classes.text}>Начать изучение слов</span>
    </MainBlock>
  );
};

const AddNewWord = () => {
  const [rangeInputColor, setRangeInputColor] = useState(
    'linear-gradient(to right,rgba(255, 211, 56, 0.15) 50%, transparent 50%)'
  );
  const [progress, setProgress] = useState(50);
  const rangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const progress = +e.target.value;
    setProgress(progress);
    const progressBarColors = {
      low: 'rgba(255, 85, 85, 0.15)',
      high: 'rgba(139, 255, 85, 0.15)',
      mid: 'rgba(255, 211, 56, 0.15)',
    };
    let progressType: 'low' | 'mid' | 'high' = 'low';
    if (progress > 34 && progress <= 66) {
      progressType = 'mid';
    } else if (progress > 66) {
      progressType = 'high';
    }

    setRangeInputColor(
      `linear-gradient(to right, ${progressBarColors[progressType]} ${progress}%, transparent ${progress}%)`
    );
  };
  return (
    <form>
      <MainBlock
        className={classes.inputWrapper}
        h='auto'
        w='100%'
        type='gradient'
      >
        <input className={classes.input}></input>
      </MainBlock>
      <MainBlock
        className={classes.inputWrapper}
        h='auto'
        w='100%'
        type='gradient'
      >
        <input className={classes.input}></input>
      </MainBlock>
      <MainBlock
        className={`${classes.inputWrapper} ${classes.rangeInputWrapper}`}
        h='auto'
        w='100%'
        type='gradient'
      >
        <motion.input
          initial={{ background: 'transparent' }}
          animate={{ background: rangeInputColor }}
          transition={{ type: 'spring', mass: 0.35 }}
          defaultValue={50}
          onChange={rangeInputHandler}
          type='range'
          className={classes.rangeInput}
        />
        <span className={classes.progress}>{`${progress}%`}</span>
      </MainBlock>
    </form>
  );
};

type Props = {};
const MultiTaskArea = (props: Props) => {
  const activeModules = useAppSelector((state) =>
    state.ui.multiTaskArea.modules.importantModule
      ? [state.ui.multiTaskArea.modules.importantModule]
      : state.ui.multiTaskArea.modules.activeModules
  );
  const modulesComponents = {
    learnButton: <StartLearningButton />,
    addNewWord: <AddNewWord />,
    dropArea: <>drop</>,
    notifications: <>notifs</>,
  };
  return (
    <MainBlock className={classes.wrapper} w='100%' h='auto' type='glass'>
      <div className={classes.content}>
        <AnimatePresence mode='wait'>
          {activeModules.map((module) => {
            return (
              <motion.div
                key={module}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                {modulesComponents[module]}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </MainBlock>
  );
};

export default MultiTaskArea;
