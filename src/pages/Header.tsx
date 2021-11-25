import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

export const Header: React.FC = () => {
    return (
        <header className='header'>
            <div className="container mx-auto">
                <Link to='/' className='multichatLogo'>MC.</Link>
            </div>
        </header>
    )
}