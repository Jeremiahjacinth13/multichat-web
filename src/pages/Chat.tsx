import React, { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, onValue, push } from 'firebase/database'
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
                let messagesData = Object.values(snapshot.val() || [])
                setMessages(getMessagesFromRequest(messagesData))
            })
        })()
    }, [])

    return (
        <div className='chat'>
            <Header className = 'bdfilter'/>
            <ChatArea messages={messages} />
            <ChatController setMessages={setMessages} />
        </div>
    )
}

const ChatController: React.FC<{ setMessages: React.Dispatch<React.SetStateAction<Message[]>> }> = () => {

    const [text, setText] = React.useState<string>('')
    const db = getDatabase()
    const auth = getAuth()
    const messagesRef = ref(db, 'messages')

    const inputElementRef = React.createRef<HTMLInputElement>()


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newMessage = {
            createdAt: Date.now(),
            text,
            sender: {
                id: auth.currentUser?.uid,
                [auth.currentUser?.photoURL ? 'image' : 'letter']:
                    auth.currentUser?.photoURL || auth.currentUser?.email?.charAt(0)
            }
        }
        await push(messagesRef, newMessage)
        setText('')
        inputElementRef.current?.focus()
    }

    return (
        <form className='container mx-auto chatForm' onSubmit={handleSubmit}>
            <input
                ref={inputElementRef}
                type='text'
                value={text}
                onChange={e => setText(e.currentTarget.value)}
                placeholder='Enter your message...'
            />
            <button type="submit">Send</button>
        </form>
    )
}

type ChatAreaProps = {
    messages: Message[],
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages }) => {

    const ref = React.createRef<HTMLDivElement>()

    useEffect(() => {
        ref.current?.scrollIntoView()
    }, [messages])

    return (
        <div className='chatArea container mx-auto'>
            {
                messages.map(message => <ChatMessage message={message} />)
            }
            <div ref={ref}></div>
        </div>
    )
}

const MessageImage: React.FC<{ message: Message }> = ({ message }) => {
    if (message.senderImage) {
        return <img src={message.senderImage} alt={message.createdAt.toString()} />
    }
    return <div className='imageLetter'>{message.senderLetter}</div>
}

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {

    const auth = getAuth()
    const isSelf = auth.currentUser?.uid === message.senderId

    return (
        <div className={`chatMessage ${isSelf ? 'self' : 'notSelf'}`}>
            <MessageImage {...{ message }} />
            <p>{message.text}</p>
        </div>
    )
}

export { Chat }