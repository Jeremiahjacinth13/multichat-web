import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import {getAuth} from 'firebase/auth'
import { firebaseApp } from './firebase';

import { Auth } from './pages/Login';
import { Chat } from './pages/Chat';

import './App.css'

const App: React.FC = () => {

  const app = firebaseApp

  return (
      <BrowserRouter>
        <Routes>
          <Route
            path='/auth'
            element={<Auth />}
          />
          <Route
            path='/'
            element={
              <RequireAuth>
                <Chat />
              </RequireAuth>
            }
          />
          <Route
            path='/chat'
            element={
              <RequireAuth>
                <Chat />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
  );
}

const RequireAuth: React.FC = () => {

  const isAuthenticated = getAuth().currentUser

  if (isAuthenticated) return <Outlet />
  else return <Navigate to='../auth' replace={true} />

}

export default App;
