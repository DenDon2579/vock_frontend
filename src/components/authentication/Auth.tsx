import React from 'react';
import classes from './Auth.module.scss';
import MainBlock from 'components/ui/blocks/mainBlock/MainBlock';
import { Variants, motion } from 'framer-motion';
import MainButton from 'components/ui/blocks/mainButton/MainButton';

type Props = {};

const Auth = (props: Props) => {
  const animationVariants: Variants = {
    hide: {
      opacity: 0,
      y: -20,
    },
    show: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        mass: 0.8,
        delay: custom * 0.35,
      },
    }),
  };

  const headerVariants: Variants = {
    hide: {
      opacity: 0,
    },
    show: (custom = 0) => ({
      opacity: 1,
      transition: {
        delay: custom * 0.35,
      },
    }),
  };
  return (
    <div className={classes.wrapper}>
      <motion.h1
        variants={animationVariants}
        initial='hide'
        animate='show'
        className={classes.title}
      >
        VOCK
      </motion.h1>

      <MainBlock
        framer={{
          variants: animationVariants,
          initial: 'hide',
          animate: 'show',
          custom: 1,
        }}
        className={classes.block}
        h='auto'
        w='auto'
        type='glass'
      >
        <MainBlock
          framer={{
            variants: headerVariants,
            initial: 'hide',
            animate: 'show',
            custom: 1.5,
          }}
          className={classes.header}
          h='auto'
          w='100%'
          type='gradientContrast'
        >
          <motion.h1 className={classes.authTitle}>вход</motion.h1>
        </MainBlock>
        <div className={classes.form}>
          <div className={classes.inputBlock}>
            <span className={classes.label}>Почта</span>
            <MainBlock
              className={classes.inputWrapper}
              w='auto'
              h='autp'
              type='gradient'
            >
              <input className={classes.input} />
            </MainBlock>
          </div>{' '}
          <div className={classes.inputBlock}>
            <span className={classes.label}>Пароль</span>
            <MainBlock
              className={classes.inputWrapper}
              w='auto'
              h='autp'
              type='gradient'
            >
              <input className={classes.input} />
            </MainBlock>
          </div>
          <div className={classes.inputBlock}>
            <span className={classes.label}>Пароль ещё раз</span>
            <MainBlock
              className={classes.inputWrapper}
              w='auto'
              h='autp'
              type='gradient'
            >
              <input className={classes.input} />
            </MainBlock>
          </div>
          <MainButton type='gradient'>Отправить</MainButton>
        </div>
      </MainBlock>
    </div>
  );
};

export default Auth;
