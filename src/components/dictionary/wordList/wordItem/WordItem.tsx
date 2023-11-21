import React, { useState } from 'react';
import classes from './WordItem.module.scss';
import { Variants, motion, useDragControls } from 'framer-motion';
import Icon from 'components/ui/other/icon/Icon';
import { AiOutlineDown } from 'react-icons/ai';
import { RiDraggable } from 'react-icons/ri';
import MainBlock from 'components/ui/blocks/mainBlock/MainBlock';
import { useAppDispatch } from 'hooks/redux';
import {
  activateImportantModule,
  deactivateImportantModule,
} from 'store/slices/uiSlice';
import { IWord } from 'types/dictionary';

interface Props extends IWord {
  progressBarColor: string;
  dndColor: string;
  custom: number;
}

const WordItem = (props: Props) => {
  const dispatch = useAppDispatch();
  const wordWrapperWariants: Variants = {
    hide: {
      opacity: 0,
      y: 20,
      position: 'relative',
      width: '100%',
      height: 'auto',
    },
    show: (i: number) => ({
      transition: { delay: i * 0.15 + 1, type: 'spring' },
      opacity: 1,
      y: 0,
      height: 30,
    }),
    drag: {
      position: 'absolute',
      width: 0,
      height: 30,
      opacity: 1,
      y: 0,
    },
  };
  const progressBarVariants: Variants = {
    hide: {
      width: 0,
    },
    show: (i: any) => ({
      transition: { delay: i.delay * 0.1 + 1.6 },
      width: i.width,
    }),
  };

  const [dragging, setDragging] = useState(false);
  const dragControls = useDragControls();

  function startDrag(event: any) {
    dragControls.start(event, { snapToCursor: true });
  }

  return (
    <>
      <motion.div
        dragControls={dragControls}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={1}
        variants={wordWrapperWariants}
        initial='hide'
        animate={dragging ? 'drag' : 'show'}
        transition={{ duration: 0.1 }}
        // style={dragging ? { position: 'absolute', width: 0, height: 30 } : {}}
        custom={props.custom}
        className={classes.wordItem}
      >
        <MainBlock w='auto' h='auto' type='gradient' className={classes.word}>
          <motion.div
            style={{
              background: props.progressBarColor,
              // width: `${props.progress}%`,
            }}
            className={`${classes.progressBar} ${
              props.progress === 100 && classes.rounded
            }`}
            variants={progressBarVariants}
            initial='hide'
            animate='show'
            custom={{
              width: `${props.progress}%`,
              delay: props.custom,
            }}
          ></motion.div>
          <motion.div
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            drag
            dragTransition={{ bounceStiffness: 1, bounceDamping: 5000 }}
            onPointerDown={startDrag}
            className={classes.drag}
            initial={{
              background: 'transparent',
              borderRightWidth: 1,
              pointerEvents: 'all',
            }}
            whileTap={{
              borderRightWidth: 0,
              background: props.dndColor,
              width: props.englishWord.length * 16,
              cursor: 'grabbing',
            }}
            whileDrag={{ pointerEvents: 'none' }}
            onMouseDown={() => {
              dispatch(activateImportantModule(['dropArea', false]));
              setDragging(true);
            }}
            onMouseUp={() => {
              dispatch(deactivateImportantModule());
              setDragging(false);
            }}
            onDragEnd={() => {
              dispatch(deactivateImportantModule());
              setDragging(false);
            }}
          >
            <Icon icon={RiDraggable} />
            {dragging && (
              <span className={classes.text}>{props.englishWord}</span>
            )}
          </motion.div>
          {!dragging && (
            <>
              <div className={classes.left}>
                <span className={classes.text}>{props.englishWord}</span>
              </div>
              <div className={classes.divider}>/</div>
              <div className={classes.right}>
                <div className={classes.translation}>
                  <span className={classes.text}>
                    {props.translations[0].text}
                  </span>
                </div>
                <div className={classes.progressValue}>
                  <span className={classes.text}>{props.progress}</span>
                </div>
              </div>
            </>
          )}
        </MainBlock>
        {!dragging && (
          <MainBlock
            w='auto'
            h='auto'
            type='gradient'
            className={classes.wordInfo}
          >
            <Icon icon={AiOutlineDown} />
          </MainBlock>
        )}
      </motion.div>
      <div style={{ height: dragging ? 40 : 0 }}></div>
    </>
  );
};

export default WordItem;
