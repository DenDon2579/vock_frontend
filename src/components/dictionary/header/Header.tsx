import React, { useState } from 'react';
import classes from './Header.module.scss';
import MainBlock from 'components/ui/blocks/mainBlock/MainBlock';
import { IconContext } from 'react-icons';
import { AiOutlineDown, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { BsSortDown } from 'react-icons/bs';
import DropDown from 'components/ui/modules/dropDown/DropDownSelect';
import { motion } from 'framer-motion';
import { useAppDispatch } from 'hooks/redux';
import {
  activateImportantModule,
  setActiveModules,
} from 'store/slices/UiSlice';
import MainButton from 'components/ui/blocks/mainButton/MainButton';

type Props = {};

const Header = (props: Props) => {
  const dispatch = useAppDispatch();
  const sortBy = [
    { id: 1, title: 'По умолчанию' },
    { id: 2, title: 'По алфавиту' },
    { id: 3, title: 'По добавлению' },
    { id: 4, title: 'Последние в тесте' },
    { id: 5, title: 'По прогрессу' },
  ];
  const addNewWord = () => {
    dispatch(activateImportantModule(['addNewWord', true]));
  };
  const [isSortUpstream, setSortDirection] = useState(false);
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring' }}
      className={classes.header}
    >
      <MainBlock
        className={`${classes.block} ${classes.search}`}
        w='100%'
        h='100%'
        type='gradient'
      >
        <div className={classes.iconWrapper}>
          <IconContext.Provider
            value={{
              color: 'rgba(208, 194, 255, 0.7)',
              className: `${classes.icon}`,
            }}
          >
            <AiOutlineSearch />
          </IconContext.Provider>
        </div>
        <div className={classes.text}>
          <input className={classes.searchInput} placeholder='поиск...' />
        </div>
      </MainBlock>
      <MainBlock
        className={`${classes.block} ${classes.sortWrapper}`}
        w='100%'
        h='100%'
        type='gradient'
      >
        <div className={classes.sort}>
          <div className={classes.sortBy}>
            <DropDown
              onSelect={() => 1}
              initialItemId={1}
              items={sortBy}
              headerClass={classes.dropDownHeader}
              dropDownClass={classes.dropDownContent}
              blockType='blank'
            />
          </div>
          <div
            className={classes.sortType}
            onClick={() => setSortDirection(!isSortUpstream)}
          >
            <motion.div
              className={`${classes.iconWrapper} ${
                isSortUpstream && classes.down
              }`}
            >
              <IconContext.Provider
                value={{
                  color: 'rgba(208, 194, 255, 0.7)',
                  className: `${classes.icon}`,
                }}
              >
                <BsSortDown />
              </IconContext.Provider>
            </motion.div>
          </div>
        </div>
      </MainBlock>
      <MainButton type='gradientContrast' onClick={addNewWord}>
        <IconContext.Provider
          value={{
            color: 'rgba(208, 194, 255, 0.7)',
            className: `${classes.icon}`,
          }}
        >
          <AiOutlinePlus />
        </IconContext.Provider>
      </MainButton>
    </motion.div>
  );
};

export default Header;
