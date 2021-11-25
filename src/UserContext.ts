import { createContext } from 'react'
import { User } from 'firebase/auth'


export type UserContextType = {
    user: User | null
    setUser: Function
}

export const UserContext = createContext<UserContextType>({
    user: null, 
    setUser: () => {}
});
