import React from 'react';
import classes from './Layout.module.scss';
import MainBlock from '../ui/blocks/mainBlock/MainBlock';
import { AiOutlineSetting } from 'react-icons/ai';
import MiniProfile from '../miniProfile/MiniProfile';
import Dictionary from 'components/dictionary/Dictionary';
import { motion } from 'framer-motion';
import MultiTaskArea from 'components/multiTaskArea/MultiTaskArea';
import {
  createBrowserRouter,
  Navigate,
  Route,
  Router,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import Learning from 'components/learning/Learning';
import Main from './main/Main';
import { useAppSelector } from 'hooks/redux';
import Auth from 'components/authentication/Auth';

type Props = {};
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Dictionary />,
//   },
//   { path: 'learning', element: <Learning /> },
// ]);

const Layout = (props: Props) => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  console.log(isAuth);
  return (
    <div className={classes.wrapper}>
      <Routes>
        <Route
          path='/*'
          element={isAuth ? <Main /> : <Navigate to='/auth' />}
        ></Route>
        <Route
          path='/auth'
          element={!isAuth ? <Auth /> : <Navigate to='/' />}
        ></Route>
      </Routes>
    </div>
  );
};

export default Layout;
