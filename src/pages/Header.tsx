import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext, UserContextType } from '../UserContext'
import './styles.css'

export const Header: React.FC<{className?:string}> = ({className}) => {

    const {logoutUser, user} = React.useContext<UserContextType>(UserContext)

    return (
        <header className={`header ${className}`}>
            <div className="container mx-auto">
                <Link to='/' className='multichatLogo'>MC.</Link>
                {
                    user &&
                    <button className = 'logoutButton' onClick={() => logoutUser(null)}>Logout</button>
                }
            </div>
        </header>
    )
}