import React, { useState } from 'react';
import classes from './TransferZone.module.scss';
import { motion } from 'framer-motion';
import MainBlock from 'components/ui/blocks/mainBlock/MainBlock';

const DropArea = (props: any) => {
  const [isDragOver, setIsDragOver] = useState(false);
  return (
    <>
      <motion.div
        className={classes.dropAreaWrapper}
        onMouseEnter={() => setIsDragOver(true)}
        onMouseLeave={() => setIsDragOver(false)}
        onMouseUp={() => alert('drop')}
        initial={{
          background: 'none',
        }}
        animate={
          !props.isRemove
            ? isDragOver
              ? {
                  boxShadow: '0 0 10px 1px rgba(255, 255 ,255 ,0.1) inset',
                }
              : { boxShadow: 'none' }
            : {
                background: isDragOver
                  ? 'linear-gradient(to right, rgba(255, 0, 0, 0.3) 100%, rgba(255, 0, 0, 0.091) 100%)'
                  : 'linear-gradient(to right, rgba(255, 0, 0, 0.3) 0%, rgba(255, 0, 0, 0.091) 0%)',
              }
        }
        transition={{ duration: isDragOver ? 2 : 0.3, type: 'just' }}
      >
        <MainBlock
          h='100%'
          w='100%'
          type='gradient'
          className={classes.dropArea}
        >
          <span className={classes.text}>{props.title}</span>
          <span className={classes.text} style={{ fontSize: 10 }}>
            {props.description}
          </span>
        </MainBlock>
      </motion.div>
    </>
  );
};

type Props = {};
const TransferZone = (props: Props) => {
  //linear-gradient(to right, ${progressBarColors[progressType]} ${progress}%, transparent ${progress}%)
  const groups = [
    {
      id: 12,
      title: 'В "Не изучаются"',
    },
    {
      id: 2,
      title: 'В "Основной словарь"',
    },
    {
      id: 3,
      title: 'В "Усиленный словарь"',
    },
    {
      id: 4,
      title: 'В "Фокус словарь"',
    },
  ];
  return (
    <div className={classes.transferZone}>
      {groups.map((i) => (
        <DropArea key={i.id} title={i.title} />
      ))}
      <DropArea
        title='Удалить'
        description='ужерживайте 2 сек.'
        isRemove={true}
      />
    </div>
  );
};

export default TransferZone;
