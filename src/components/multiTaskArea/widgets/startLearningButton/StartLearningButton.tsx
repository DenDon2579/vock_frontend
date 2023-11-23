import React from 'react';
import classes from './StartLearningButton.module.scss';
import MainButton from 'components/ui/blocks/mainButton/MainButton';
import { Link } from 'react-router-dom';

type Props = {};

const StartLearningButton = (props: Props) => {
  return (
    <Link to='/learning' style={{ textDecoration: 'none' }}>
      <MainButton type='gradient'>Начать изучение слов</MainButton>
    </Link>
  );
};

export default StartLearningButton;
