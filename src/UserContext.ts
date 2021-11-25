import { createContext } from 'react'
import { User } from 'firebase/auth'


export type UserContextType = {
    user: User | null
    loginUser: Function
    logoutUser: Function
}

export const UserContext = createContext<UserContextType>({
    user: null, 
    loginUser: () => {},
    logoutUser: () => {}
});
