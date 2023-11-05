import React, { useState } from 'react';
import classes from './Dictionary.module.scss';
import MainBlock from 'components/ui/blocks/MainBlock';
import { IconContext } from 'react-icons';
import { AiOutlineDown } from 'react-icons/ai';
import {
  AnimatePresence,
  VariantLabels,
  Variants,
  motion,
} from 'framer-motion';
import DropDown from 'components/ui/modules/dropDown/DropDownSelect';
import { IDropDownItem } from 'types/ui';
import { log } from 'console';
import Header from './header/Header';
import WordList from './wordList/WordList';

type Props = {};

const Dictionary = (props: Props) => {
  const [a, b] = useState(false);
  const handle = () => {
    b(!a);
  };

  const dropDownItems = [
    {
      id: 1,
      title: 'Все слова',
    },
    {
      id: 2,
      title: 'Основной словарь',
    },
    {
      id: 3,
      title: 'Усиленный словарь',
    },
    {
      id: 4,
      title: 'Фокус словарь',
    },
  ];

  const setDictionary = (item: IDropDownItem) => {
    console.log(item);
  };

  const createDictionary = () => {
    console.log('NEW');
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.dictionarySelectWrapper}>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          className={classes.dictionarySelect}
        >
          <DropDown
            headerClass={classes.dropDownHeader}
            initialItemId={1}
            onSelect={setDictionary}
            items={dropDownItems}
            lastItemActionHandler={createDictionary}
            blockType='glass'
            lastItemTitle='Создать словарь...'
          />
        </motion.div>
      </div>

      <MainBlock className={classes.dictionary} w='100%' h='100%' type='glass'>
        <div className={classes.content}>
          <MainBlock
            className={classes.headerWrapper}
            w='100%'
            h='auto'
            type='gradient'
          >
            <Header />
          </MainBlock>
          <WordList />
        </div>
      </MainBlock>
    </div>
  );
};

export default Dictionary;
