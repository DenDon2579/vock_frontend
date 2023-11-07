import React from 'react';
import classes from './MiniProfile.module.scss';
import MainBlock from '../ui/blocks/mainBlock/MainBlock';
import { AiOutlineLogout, AiOutlineSetting } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import DropDown from 'components/ui/modules/dropDown/DropDownSelect';
type Props = {};

const MiniProfile = (props: Props) => {
  return (
    <MainBlock w='auto' h='auto' type='glass'>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <div className={classes.avatarWrapper}>
            <img
              src='https://i1.sndcdn.com/artworks-BXugSxIERNzWqoyd-ZCnyCA-t500x500.jpg'
              className={classes.avatar}
              alt=''
            />
          </div>
          <div className={classes.text}>
            <span>Профиль</span>
          </div>
          <div className={classes.optionsWrapper}>
            <div className={classes.options}>
              <IconContext.Provider
                value={{
                  className: classes.icon,
                }}
              >
                <AiOutlineSetting />
                <AiOutlineLogout />
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </MainBlock>
  );
};

export default MiniProfile;
