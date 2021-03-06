import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from './Header'
import { Loader } from './Loader'
import people from '../people.jpeg'

import { UserContext, UserContextType } from '../UserContext'

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    signInWithPopup,
    GoogleAuthProvider,
    UserCredential
} from 'firebase/auth'

import './styles.css'


const Auth: React.FC = function () {
    type AuthType = 'login' | 'signup'

    const [authType, setAuthType] = useState<AuthType>('login')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const { loginUser } = React.useContext<UserContextType>(UserContext)

    const navigate = useNavigate()

    const auth = getAuth()

    auth.useDeviceLanguage()

    const signInWithGoogle = async () => {
        try {
            const googleProvider = new GoogleAuthProvider()
            const result: UserCredential = await signInWithPopup(auth, googleProvider)

            if (result.user) {
                loginUser(result.user)
                navigate('../')
            }

        } catch (error) {
            console.log(error)
        }
    }

    const signInWithEmail: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (authType === 'login') {
            return signInWithEmailAndPassword(auth, email, password)
                .then(({ user }) => {
                    if (user) {
                        loginUser(user)
                        navigate('../')
                    }
                })
                .catch(error => setError(error.message))
                .finally(() => setLoading(false))
        }
        else {
            return createUserWithEmailAndPassword(auth, email, password)
                .then(({ user }) => {
                    if (user) {
                        loginUser(user)
                        navigate('../')
                    }
                })
                .catch(error => setError(error.message))
                .finally(() => setLoading(false))
        }
    }

    return (
        <React.Fragment>
            <Header />
            <div className='login'>
                <div className='loginRight'>
                    <img
                        className='loginImage'
                        src={people}
                        alt="people smiling taking a group selfie"
                    />
                </div>
                <form onSubmit={signInWithEmail}>
                    <p className='heading'>{authType === 'login' ? 'Login' : "Sign Up"}</p>
                    {error && <div className='error'>{error}</div>}
                    <input
                        type="text"
                        onChange={e => setEmail(e.currentTarget.value)}
                        value={email}
                    />
                    <input
                        type="password"
                        onChange={e => setPassword(e.currentTarget.value)}
                        value={password}
                    />
                    <p className='signupText pointer' onClick={() => setAuthType(authType === 'signup' ? 'login' : 'signup')}>{
                        authType === 'signup' ?
                            'Already have an account? Login' :
                            'Don\'t have an account? Signup'
                    }</p>
                    <button type="submit">{loading ? <Loader /> : authType === 'signup' ? 'Sign Up' : "Login"}</button>
                    <p className='heading'>OR</p>
                    <button onClick={signInWithGoogle} style={{ letterSpacing: 'normal' }} type='button'>
                        <img
                            src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                            alt='logo'
                            style={{ marginRight: 10 }}
                        />
                        Sign up with google
                    </button>
                </form>
            </div>
        </React.Fragment>
    )
}

export { Auth }
