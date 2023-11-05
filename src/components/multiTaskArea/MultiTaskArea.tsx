import React, { ReactNode, useEffect, useState } from 'react';
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

type Props = {};
const MultiTaskArea = (props: Props) => {
  const activeModules = useAppSelector((state) =>
    state.ui.multiTaskArea.modules.importantModule
      ? [state.ui.multiTaskArea.modules.importantModule]
      : state.ui.multiTaskArea.modules.activeModules
  );
  const modulesComponents = {
    learnButton: <StartLearningButton />,
    addNewWord: <>New</>,
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
