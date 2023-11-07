import React from 'react';
import classes from './WordItem.module.scss';
import { Variants, delay, motion } from 'framer-motion';
import Icon from 'components/ui/other/icon/Icon';
import { AiOutlineDown } from 'react-icons/ai';
import MainBlock from 'components/ui/blocks/mainBlock/MainBlock';

type Props = {
  progress: number;
  progressBarColor: string;
  word: string;
  translation: string;
  custom: number;
};

const WordItem = (props: Props) => {
  const wordWrapperWariants: Variants = {
    hide: {
      opacity: 0,
      y: 20,
    },
    show: (i: number) => ({
      transition: { delay: i * 0.15 + 1, type: 'spring' },
      opacity: 1,
      y: 0,
    }),
  };
  const progressBarVariants: Variants = {
    hide: {
      width: 0,
    },
    show: (i: any) => ({
      transition: { delay: i.delay * 0.1 + 1.6 },
      width: i.width,
    }),
  };
  return (
    <motion.div
      variants={wordWrapperWariants}
      initial='hide'
      animate='show'
      custom={props.custom}
      className={classes.wordItem}
    >
      <MainBlock w='auto' h='auto' type='gradient' className={classes.word}>
        <motion.div
          style={{
            background: props.progressBarColor,
            // width: `${props.progress}%`,
          }}
          className={`${classes.progressBar} ${
            props.progress === 100 && classes.rounded
          }`}
          variants={progressBarVariants}
          initial='hide'
          animate='show'
          custom={{
            width: `${props.progress}%`,
            delay: props.custom,
          }}
        ></motion.div>
        <div className={classes.left}>
          <span className={classes.text}>hello</span>
        </div>
        <div className={classes.divider}>/</div>
        <div className={classes.right}>
          <div className={classes.translation}>
            <span className={classes.text}>привет</span>
          </div>
          <div className={classes.progressValue}>
            <span className={classes.text}>{props.progress}</span>
          </div>
        </div>
      </MainBlock>
      <MainBlock w='auto' h='auto' type='gradient' className={classes.wordInfo}>
        <Icon icon={AiOutlineDown} />
      </MainBlock>
    </motion.div>
  );
};

export default WordItem;
