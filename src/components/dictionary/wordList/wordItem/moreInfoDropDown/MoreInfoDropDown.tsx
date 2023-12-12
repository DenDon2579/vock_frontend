import React from 'react';
import classes from './MoreInfoDropDown.module.scss';

type Props = {
  ref: React.RefObject<HTMLDivElement>;
};

const MoreInfoDropDown = (props: Props) => {
  return <div ref={props.ref} className={classes.dropDown}></div>;
};

export default MoreInfoDropDown;
