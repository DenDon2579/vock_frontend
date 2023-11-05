import React, {
  useState,
  useEffect,
  useRef,
  ReactEventHandler,
  ReactNode,
} from 'react';
import classes from './DropDownSelect.module.scss';
import MainBlock from 'components/ui/blocks/MainBlock';
import { IconContext } from 'react-icons';
import { AiOutlineDown } from 'react-icons/ai';
import { IDropDownItem } from 'types/ui';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import Icon from 'components/ui/other/icon/Icon';

type Props = {
  items: IDropDownItem[];
  onSelect: (item: IDropDownItem) => void;
  initialItemId: number;
  lastItemActionHandler?: () => void;
  lastItemTitle?: string;
  headerClass?: string;
  dropDownClass?: string;
  blockType?: 'blank' | 'gradient' | 'glass';
};

const DropDown = (props: Props) => {
  const [items, setItems] = useState(props.items);

  const [selectedItem, selectItem] = useState(
    props.items.find((i) => i.id === props.initialItemId)
  );
  const [isVisible, setVisibility] = useState(false);
  useEffect(() => {
    setItems(props.items.filter((i) => i.id !== selectedItem?.id));
  }, [selectedItem]);
  const dropDownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (!dropDownRef?.current?.contains(e.target)) {
        setVisibility(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  });

  const changeVisibility = () => {
    setVisibility(!isVisible);
  };

  const handleSelect = (item: IDropDownItem) => {
    selectItem(item);
    props.onSelect(item);
    setVisibility(false);
  };

  const dropDownVariants: Variants = {
    hide: {
      height: 0,
      opacity: 0,
    },
    show: {
      height: 'auto',
      opacity: 1,
      transition: {
        type: 'spring',
        mass: 0.55,
      },
    },
  };

  const itemVariants: Variants = {
    hide: {
      x: 0,
      y: -50,
      opacity: 0,
    },
    show: (t) => ({
      x: 0,
      y: 0,
      opacity: 1,
      transition: { delay: t * 0.05 },
    }),
    // exit: (t) => ({
    //   y: -12,
    //   opacity: 0,
    //   transition: { delay: t * 0.05 },
    // }),
  };

  return (
    <div className={classes.wrapper} ref={dropDownRef}>
      <MainBlock
        h='100%'
        w='100%'
        type={props.blockType ? props.blockType : 'gradient'}
        className={`${classes.header} ${isVisible && classes.active} ${
          props.headerClass
        }`}
        onClick={changeVisibility}
      >
        <span className={classes.groupTitle}>{selectedItem?.title}</span>

        {/* <IconContext.Provider
          value={{
            color: 'rgba(208, 194, 255, 0.7)',
            className: `${classes.icon} ${isVisible && classes.flip}`,
          }}////////././././././././././././././././././././././././././././././././././././././././././././././././././././././././././.
        >
          <AiOutlineDown />
        </IconContext.Provider> */}
        <Icon
          icon={AiOutlineDown}
          className={`${classes.icon} ${isVisible && classes.flip}`}
        />
      </MainBlock>
      <AnimatePresence>
        {isVisible && (
          <MainBlock
            framer={{
              variants: dropDownVariants,
              initial: 'hide',
              exit: 'hide',
              animate: 'show',
            }}
            className={`${classes.content} ${props.dropDownClass}`}
            w='100%'
            h='auto'
            type='gradient'
          >
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                onClick={() => handleSelect(item)}
                className={classes.dropDownItem}
                variants={itemVariants}
                initial='hide'
                animate='show'
                exit='exit'
                custom={i}
              >
                <span>{item.title}</span>
              </motion.div>
            ))}
            {props.lastItemActionHandler && (
              <motion.div
                onClick={() => {
                  props.lastItemActionHandler?.();
                  setVisibility(false);
                }}
                className={`${classes.dropDownItem} ${classes.lastAction}`}
                variants={itemVariants}
                initial='hide'
                animate='show'
                exit={{ visibility: 'hidden' }}
                custom={items.length}
              >
                <span>{props.lastItemTitle}</span>
              </motion.div>
            )}
          </MainBlock>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropDown;
