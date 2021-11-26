import React, { useEffect } from 'react'
import {getAuth} from 'firebase/auth'
import { getDatabase, ref, onValue } from 'firebase/database'
import './styles.css'
import { Header } from './Header'


type Message = {
    text: string
    createdAt: number,
    senderImage?: string,
    senderLetter?: string,
    senderId: string
}

const getMessagesFromRequest = (requestMessages: any[]): Message[] => {
    return requestMessages.map(requestMessage => ({
        text: requestMessage.text,
        createdAt: requestMessage.createdAt,
        senderImage: requestMessage.sender.image,
        senderLetter: requestMessage.sender.letter,
        senderId: requestMessage.sender.id
    }))
}

const Chat: React.FC = function () {

    const [messages, setMessages] = React.useState<Message[]>([])
    const db = getDatabase()

    useEffect(() => {
        (async function () {
            const messagesRef = ref(db, 'messages')
            onValue(messagesRef, snapshot => {
                let messagesData = Object.values(snapshot.val())
                setMessages(getMessagesFromRequest(messagesData))
            })
        })()
    }, [])

    return (
        <div className='chat'>
            <Header />
            <ChatArea messages = {messages}/>
        </div>
    )
}

const ChatArea: React.FC<{messages: Message[]}> = ({messages}) => {

    return (
        <div className='chatArea container mx-auto'>
            {
                messages.map(message => <ChatMessage message={message} />)
            }
        </div>
    )
}
const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {

    const auth = getAuth()

    return (
        <div className = {`chat ${message.senderId === auth.currentUser?.uid ? 'self' : 'notSelf'}`}>
            <p>Text: {message.text}</p>
            <p>SenderImage: <img src={message.senderImage} /></p>
            <p>SenderLetter: {message.senderLetter}</p>
            <p>Created At: {new Date(message.createdAt).toDateString()}</p>
        </div>
    )
}

export { Chat }