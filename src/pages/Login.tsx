import React, { useState, FormEventHandler } from 'react'
import { Header } from './Header'
import people from '../people.jpeg'

import './styles.css'

const Auth: React.FC = function () {
    type AuthType = 'login' | 'signup'

    const [authType, setAuthType] = useState<AuthType>('login')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const signInWithGoogle = () => {
        
    }
    const signInWithEmail = (e) => { 
        e.preventDefault();
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
                    <p className = 'signupText' onClick={() => setAuthType(authType === 'signup' ? 'login' : 'signup')}>{
                        authType === 'signup' ?
                            'Already have an account? Login' :
                            'Don\'t have an account? Signup'
                    }</p>
                    <button type="submit">{authType === 'signup' ? 'Sign Up' : "Login"}</button>
                    <p className='heading'>OR</p>
                    <button onClick={signInWithGoogle} style={{ letterSpacing: 'normal' }}>
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
