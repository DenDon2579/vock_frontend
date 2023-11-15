import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import classes from './MultiTaskArea.module.scss';
import MainBlock from 'components/ui/blocks/mainBlock/MainBlock';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { AnimatePresence, Reorder, motion } from 'framer-motion';
import { deactivateImportantModule } from 'store/slices/UiSlice';
import MainButton from 'components/ui/blocks/mainButton/MainButton';
import { Link } from 'react-router-dom';

const StartLearningButton = () => {
  return (
    <Link to='/learning' style={{ textDecoration: 'none' }}>
      <MainButton type='gradient'>Начать изучение слов</MainButton>
    </Link>
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

  const [translations, setTranslations] = useState(['привет', 'хай', 'ку']);

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
          placeholder='hello'
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
            <Reorder.Group
              className={classes.translationList}
              values={translations}
              onReorder={setTranslations}
              as='ol'
              axis='y'
              transition={{ type: 'just' }}
            >
              {translations.map((item) => (
                <Reorder.Item
                  className={classes.translation}
                  key={item}
                  value={item}
                >
                  <span>{item}</span>
                  <input
                    className={classes.checkbox}
                    type='checkbox'
                    defaultChecked={true}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
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
        <MainButton
          onClick={() => dispatch(deactivateImportantModule())}
          type='gradient'
        >
          Назад
        </MainButton>
        <MainButton isHidden={!isWordEntered} type='gradientContrast'>
          Добавить
        </MainButton>
      </div>
    </form>
  );
};

const DropArea = (props: any) => {
  const [isDragOver, setIsDragOver] = useState(false);
  return (
    <>
      <motion.div
        className={classes.dropAreaWrapper}
        onMouseEnter={() => setIsDragOver(true)}
        onMouseLeave={() => setIsDragOver(false)}
        onMouseUp={() => alert('drop')}
        initial={{
          background: 'none',
        }}
        animate={
          !props.isRemove
            ? isDragOver
              ? {
                  boxShadow: '0 0 10px 1px rgba(255, 255 ,255 ,0.1) inset',
                }
              : { boxShadow: 'none' }
            : {
                background: isDragOver
                  ? 'linear-gradient(to right, rgba(255, 0, 0, 0.3) 100%, rgba(255, 0, 0, 0.091) 100%)'
                  : 'linear-gradient(to right, rgba(255, 0, 0, 0.3) 0%, rgba(255, 0, 0, 0.091) 0%)',
              }
        }
        // transition={{ duration: isDragOver ? 2 : 0.3, type: 'just' }}
      >
        <MainBlock
          h='100%'
          w='100%'
          type='gradient'
          className={classes.dropArea}
        >
          <span className={classes.text}>{props.title}</span>
          <span className={classes.text} style={{ fontSize: 10 }}>
            {props.description}
          </span>
        </MainBlock>
      </motion.div>
    </>
  );
};

const TransferZone = () => {
  //linear-gradient(to right, ${progressBarColors[progressType]} ${progress}%, transparent ${progress}%)
  const groups = [
    {
      id: 12,
      title: 'В "Не изучаются"',
    },
    {
      id: 2,
      title: 'В "Основной словарь"',
    },
    {
      id: 3,
      title: 'В "Усиленный словарь"',
    },
    {
      id: 4,
      title: 'В "Фокус словарь"',
    },
  ];
  return (
    <div className={classes.transferZone}>
      {groups.map((i) => (
        <DropArea key={i.id} title={i.title} />
      ))}{' '}
      <DropArea
        title='Удалить'
        description='ужерживайте 2 сек.'
        isRemove={true}
      />
    </div>
  );
};

type Props = {};
const MultiTaskArea = (props: Props) => {
  const activeModules = useAppSelector((state) =>
    state.ui.multiTaskArea.modules.importantModule
      ? [state.ui.multiTaskArea.modules.importantModule]
      : state.ui.multiTaskArea.modules.activeModules
  );
  console.log(activeModules);

  const modulesComponents = {
    learnButton: <StartLearningButton />,
    addNewWord: <AddNewWord />,
    dropArea: <TransferZone />,
    notifications: <>notifs</>,
  };
  return (
    <MainBlock className={classes.wrapper} w='100%' h='auto' type='glass'>
      <div className={classes.content}>
        <AnimatePresence>
          {activeModules.map((module) => {
            return (
              <motion.div
                className={classes.module}
                key={module.type}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <div className={classes.title}>
                  <span>{module.title}</span>
                </div>

                {modulesComponents[module.type]}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </MainBlock>
  );
};

export default MultiTaskArea;
