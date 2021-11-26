import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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

      loginUser: setUserState,

      logoutUser: () => {
        auth.signOut()
        .then(() => setUserState(null))
      }

    }}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<RequireAuth element={<Chat />} />}
          />
          <Route
            path='/chat'
            element={<RequireAuth element={<Chat />} />}
          />
          <Route
            path='/auth'
            element={<Auth />}
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

const RequireAuth: React.FC<{ element: React.ReactElement }> = ({ element }) => {

  const { user } = React.useContext<UserContextType>(UserContext)

  const isAuthenticated = !!user;

  if (isAuthenticated) return element
  else return <Navigate to='../auth' replace={true} />

}

export default App;
