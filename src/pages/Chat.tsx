import React from 'react'
import { UserContext, UserContextType } from '../UserContext'

const Chat: React.FC = function () {

    const {logoutUser} = React.useContext<UserContextType>(UserContext)

    return (
        <div className='chatScreen'>
            <h1>This is the chat page</h1>
            {

            }
            <button onClick={() => logoutUser()}></button>
        </div>
    )
}

export { Chat }