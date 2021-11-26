import React, { useEffect } from 'react'
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

    useEffect(() => {

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
    
    const inputElementRef = React.createRef<HTMLInputElement>()


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
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

    const isSelf = true

    return (
        <div className={`chatMessage ${isSelf ? 'self' : 'notSelf'}`}>
            <MessageImage {...{ message }} />
            <p>{message.text}</p>
        </div>
    )
}

export { Chat }