import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import classes from './Sidebar.module.scss';
import MainBlock from 'components/ui/blocks/mainBlock/MainBlock';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { AnimatePresence, Reorder, motion } from 'framer-motion';
import { deactivateImportantWidget } from 'store/slices/uiSlice';
import MainButton from 'components/ui/blocks/mainButton/MainButton';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslateWordQuery } from 'services/DictionaryService';
import { AiOutlineToTop } from 'react-icons/ai';
import Icon from 'components/ui/other/icon/Icon';
import StartLearningButton from './widgets/startLearningButton/StartLearningButton';
import AddNewWord from './widgets/addNewWord/AddNewWord';
import TransferZone from './widgets/transferZone/TransferZone';

type Props = {};
const MultiTaskArea = (props: Props) => {
  const activeWidgets = useAppSelector((state) =>
    state.ui.multiTaskArea.widgets.importantWidget
      ? [state.ui.multiTaskArea.widgets.importantWidget]
      : state.ui.multiTaskArea.widgets.activeWidgets
  );

  const widgets = {
    learnButton: <StartLearningButton />,
    addNewWord: <AddNewWord />,
    dropArea: <TransferZone />,
    notifications: <>notifs</>,
  };
  return (
    <MainBlock className={classes.wrapper} w='100%' h='auto' type='glass'>
      <div className={classes.content}>
        <AnimatePresence mode='popLayout'>
          {activeWidgets.map((widget) => {
            return (
              <motion.div
                className={classes.module}
                key={widget.type}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <div className={classes.title}>
                  <span>{widget.title}</span>
                </div>

                {widgets[widget.type]}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </MainBlock>
  );
};

export default MultiTaskArea;
