import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
import { SummaryApi } from './common/commonApi';
import { useDispatch, useSelector } from "react-redux"
import { setUserDetails } from './features/userSlice';
import UserContext from './context/userContext';

function App() {

  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)

  const fetchUsers = async () => {
    const apiData = await fetch(SummaryApi.getCurrentUser.url, {
      credentials: "include"
    })
    const response = await apiData.json()
    if (response.success) {
      dispatch(setUserDetails(response.data))
    }

  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      <UserContext.Provider
        value={{
          fetchUsers
        }}
      >
        <ToastContainer position='top-center' draggable />

        <Suspense fallback={<div>Loading.....</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            {currentUser && (<Route path="/dashboard/*" element={<Dashboard />} />)}
            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
        </Suspense>
      </UserContext.Provider>
    </>
  );
}

export default App;