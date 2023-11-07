import React from 'react';
import classes from './WordList.module.scss';
import { IconContext } from 'react-icons';
import { RxSlash } from 'react-icons/rx';
import WordItem from './wordItem/WordItem';

type Props = {};

const WordList = (props: Props) => {
  const progressBarColors = {
    low: 'rgba(255, 85, 85, 0.05)',
    high: 'rgba(139, 255, 85, 0.05)',
    mid: 'rgba(255, 211, 56, 0.05)',
  };
  const dndColors = {
    low: 'rgba(255, 85, 85, 0.25)',
    high: 'rgba(139, 255, 85, 0.25)',
    mid: 'rgba(255, 211, 56, 0.25)',
  };
  const words = [
    { id: 1, word: 'hello', translation: 'привет', progress: 30 },
    { id: 2, word: 'hello', translation: 'привет', progress: 100 },
    { id: 3, word: 'hello', translation: 'привет', progress: 60 },
    { id: 4, word: 'hello', translation: 'привет', progress: 45 },
    { id: 5, word: 'hello', translation: 'привет', progress: 82 },
  ].map((word) => {
    let progressType: 'low' | 'mid' | 'high' = 'low';
    if (word.progress > 34 && word.progress <= 66) {
      progressType = 'mid';
    } else if (word.progress > 66) {
      progressType = 'high';
    }
    return {
      ...word,
      progressBarColor: progressBarColors[progressType],
      dndColor: dndColors[progressType],
    };
  });

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        {words.map((word, i) => (
          <WordItem custom={i} key={word.id} {...word} />
        ))}
      </div>
    </div>
  );
};

export default WordList;
