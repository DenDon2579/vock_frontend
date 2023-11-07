import React, { ReactNode } from 'react';
import classes from './MainButton.module.scss';
import MainBlock from '../mainBlock/MainBlock';

type Props = {
  type: 'gradient' | 'gradientContrast' | 'blank';
  children: ReactNode;
  onClick?: ([any]: any) => void;
  isHidden?: boolean;
};

const MainButton = (props: Props) => {
  return (
    <>
      {!props.isHidden && (
        <MainBlock
          h='auto'
          w='100%'
          onClick={props.onClick}
          type={props.type}
          className={classes.button}
        >
          {props.children}
        </MainBlock>
      )}
    </>
  );
};

export default MainButton;
