import React from 'react';
import classes from './MiniProfile.module.scss';
import MainBlock from '../ui/blocks/mainBlock/MainBlock';
import { AiOutlineLogout, AiOutlineSetting } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import DropDown from 'components/ui/modules/dropDown/DropDownSelect';
import { useGetUserDataQuery } from 'services/UserService';
type Props = {};

const MiniProfile = (props: Props) => {
  const { data: userData } = useGetUserDataQuery(null);
  return (
    <MainBlock w='auto' h='auto' type='glass'>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <div className={classes.avatarWrapper}>
            <img src={userData?.avatar} className={classes.avatar} alt='' />
          </div>
          <div className={classes.text}>
            <span>{userData?.name}</span>
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
