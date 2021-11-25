import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { getAuth, User } from 'firebase/auth'
import { firebaseApp } from './firebase';
import { UserContext, UserContextType } from './UserContext';

import { Auth } from './pages/Login';
import { Chat } from './pages/Chat';

import './App.css'

const App: React.FC = () => {

  const auth = getAuth(firebaseApp)

  const [userState, setUserState] = React.useState<User | null>(auth.currentUser)

  return (
    <UserContext.Provider value={{
      user: userState,
      setUser: setUserState
    }}>
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
    </UserContext.Provider>
  );
}

const RequireAuth: React.FC = () => {

  const {user} = React.useContext<UserContextType>(UserContext)

  const isAuthenticated = !!user;

  if (isAuthenticated) return <Outlet />
  else return <Navigate to='../auth' replace={true} />

}

export default App;
