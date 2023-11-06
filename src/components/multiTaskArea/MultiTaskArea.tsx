import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import classes from './MultiTaskArea.module.scss';
import MainBlock from 'components/ui/blocks/MainBlock';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { AnimatePresence, motion } from 'framer-motion';
import { deactivateImportantModule } from 'store/slices/UiSlice';

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
  const dispatch = useAppDispatch();
  const [rangeInputColor, setRangeInputColor] = useState(
    'linear-gradient(to right,rgba(255, 211, 56, 0.1) 50%, transparent 50%)'
  );
  const [englishWord, setEndlishWord] = useState('');
  const [isWordEntered, setIsWordEntered] = useState(false);
  const [progress, setProgress] = useState(50);

  const rangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const progress = +e.target.value;
    setProgress(progress);
    const progressBarColors = {
      low: 'rgba(255, 85, 85, 0.1)',
      high: 'rgba(139, 255, 85, 0.1)',
      mid: 'rgba(255, 211, 56, 0.1)',
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

  const wordInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value) {
      setEndlishWord(value);
      setIsWordEntered(true);
    } else {
      setIsWordEntered(false);
    }
  };

  return (
    <form className={classes.form}>
      <span className={classes.label}>Слово на английском</span>
      <MainBlock
        className={`${classes.inputWrapper} ${classes.stage}`}
        h='auto'
        w='100%'
        type='gradient'
      >
        <input
          onChange={wordInputChangeHandler}
          className={classes.input}
        ></input>
      </MainBlock>

      {isWordEntered && (
        <>
          <span className={classes.label}>Переводы</span>
          <MainBlock
            className={`${classes.translationsWrapper} ${classes.stage}`}
            h='auto'
            w='100%'
            type='gradient'
          >
            <ul className={classes.translationList}>
              <li className={classes.translation}>
                <span>привет</span>
                <input className={classes.checkbox} type='checkbox' />
              </li>
              <li className={classes.translation}>
                <span>хай</span>
                <input className={classes.checkbox} type='checkbox' />
              </li>
              <li className={classes.translation}>
                <span>ку</span>
                <input className={classes.checkbox} type='checkbox' />
              </li>
            </ul>
          </MainBlock>
          <span className={classes.label}>Как хорошо вы знаете это слово?</span>
          <MainBlock
            className={`${classes.inputWrapper} ${classes.stage}`}
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
        </>
      )}

      <div className={classes.buttons}>
        <MainBlock
          onClick={() => dispatch(deactivateImportantModule())}
          className={classes.button}
          h='auto'
          w='100%'
          type='gradient'
        >
          Назад
        </MainBlock>
        <MainBlock
          hidden={!isWordEntered}
          className={classes.button}
          h='auto'
          w='100%'
          type='gradientContrast'
        >
          Добавить
        </MainBlock>
      </div>
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
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
