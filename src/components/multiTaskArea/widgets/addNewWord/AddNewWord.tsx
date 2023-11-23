import React, { ChangeEvent, useState } from 'react';
import classes from './AddNewWord.module.scss';
import { useAppDispatch } from 'hooks/redux';
import { useTranslateWordQuery } from 'services/DictionaryService';
import MainBlock from 'components/ui/blocks/mainBlock/MainBlock';
import MainButton from 'components/ui/blocks/mainButton/MainButton';
import { deactivateImportantWidget } from 'store/slices/uiSlice';
import { motion } from 'framer-motion';

type Props = {};

const AddNewWord = (props: Props) => {
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

    setEndlishWord(value);
    if (value) {
      setIsWordEntered(true);
    } else {
      setIsWordEntered(false);
    }
  };

  const { data: translations = [] } = useTranslateWordQuery(englishWord);
  console.log(translations);
  const translationChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {};

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
        <div className={classes.stage}>
          <span className={classes.label}>
            {!!translations.length ? 'Переводы' : 'Нет переводов'}
          </span>
          {!!translations.length && (
            <MainBlock
              className={`${classes.translationsWrapper} `}
              h='auto'
              w='100%'
              type='gradient'
            >
              <div className={classes.translationHeader}>
                <span className={classes.text}>Основной перевод</span>
              </div>

              <div className={classes.translation}>
                <span className={classes.text}>{translations?.[0]?.text}</span>
                <div>
                  <input
                    className={classes.checkbox}
                    type='checkbox'
                    defaultChecked={true}
                  />
                </div>
              </div>
            </MainBlock>
          )}

          {translations?.length > 1 && (
            <MainBlock
              className={`${classes.translationsWrapper} `}
              h='auto'
              w='100%'
              type='gradient'
            >
              <ul className={classes.translationList}>
                <div className={classes.translationHeader}>
                  <span className={classes.text}>Другие переводы</span>
                </div>
                {translations?.slice(1).map((item) => (
                  <li
                    className={classes.translation}
                    key={item.text + item.popularity}
                  >
                    <span>{item.text}</span>
                    <div>
                      <input
                        onChange={translationChangeHandler}
                        className={classes.checkbox}
                        type='checkbox'
                        defaultChecked={true}
                      />
                      {/* <Icon
                      icon={AiOutlineToTop}
                      className={classes.makePrimary}
                    /> */}
                    </div>
                  </li>
                ))}
              </ul>
            </MainBlock>
          )}

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
        </div>
      )}

      <div className={classes.buttons}>
        <MainButton
          onClick={() => dispatch(deactivateImportantWidget())}
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

export default AddNewWord;
