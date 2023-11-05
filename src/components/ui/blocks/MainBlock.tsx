import React, { ReactInstance, ReactNode, ReactPropTypes } from 'react';
import classes from './MainBlock.module.scss';
import { Transition, VariantLabels, Variants, motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  w: string;
  h: string;
  type: 'transparent' | 'gradient' | 'blank' | 'solid' | 'glass';
  borderRadius?: string;
  className?: string;
  framer?: {
    variants?: Variants;
    initial?: VariantLabels;
    animate?: VariantLabels;
    exit?: VariantLabels;
    transition?: Transition;
    custom?: number;
  };
  [key: string]: any;
}

const MainBlock = (props: Props) => {
  const {
    children,
    w,
    h,
    style,
    type,
    borderRadius,
    className,
    framer,
    ...other
  } = props;
  return (
    <motion.div
      style={{
        width: w,
        height: h,
        borderRadius: borderRadius,
        ...style,
      }}
      className={`${classes.main} ${classes[type]} ${className}`}
      variants={framer?.variants}
      initial={framer?.initial}
      animate={framer?.animate}
      exit={framer?.exit}
      transition={framer?.transition}
      custom={framer?.custom}
      {...other}
    >
      {props.children}
    </motion.div>
  );
};

export default MainBlock;
