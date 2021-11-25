import {createContext } from 'react'
import {UserCredential} from 'firebase/auth'

export const UserStateContext = createContext<UserCredential | null>(null)
