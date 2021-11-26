import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext, UserContextType } from '../UserContext'
import './styles.css'

export const Header: React.FC = () => {

    const {logoutUser} = React.useContext<UserContextType>(UserContext)

    return (
        <header className='header'>
            <div className="container mx-auto">
                <Link to='/' className='multichatLogo'>MC.</Link>
                <button className = 'logoutButton' onClick={() => logoutUser(null)}>Logout</button>
            </div>
        </header>
    )
}