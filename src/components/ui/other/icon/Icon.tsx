import React from 'react';
import classes from './Icon.module.scss';
import { IconContext, IconType } from 'react-icons';
type Props = {
  icon: IconType;
  className?: string;
};

const Icon = (props: Props) => {
  return (
    <IconContext.Provider
      value={{
        color: 'rgba(208, 194, 255, 0.7)',
        className: props.className,
      }}
    >
      <props.icon />
    </IconContext.Provider>
  );
};

export default Icon;
