import React from 'react'
import { createContext } from 'react'


//dummy user - replace with firebase's default user
type User = {}


export type UserContextType = {
    user: User | null
    loginUser: React.Dispatch<React.SetStateAction<User | null>>
    logoutUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextType>({
    user: null, 
    loginUser: () => {},
    logoutUser: () => {}
});
