import React from 'react'
import { Outlet } from 'react-router-dom';
import LoginPage from '../../features/account/LoginPage';
import { useAppSelector } from '../../store/store'

export default function AuthRoute() {
  const {loggedIn } = useAppSelector(state => state.account);

  return loggedIn ? <Outlet/> : <LoginPage/>
}
