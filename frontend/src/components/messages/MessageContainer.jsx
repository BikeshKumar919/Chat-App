import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from 'react-icons/ti'
import { useAuthContext } from '../../context/AuthContext'
import useConversations from '../../zustand/useConversation'
const MessageContainer = () => {
  const {selectedConversation, setSelectedConversation} = useConversations()
  useEffect(() => {
    return () => {setSelectedConversation(null)}
  }, [setSelectedConversation])
  return (
    <div className='flex flex-col md:min-w-[450px]'>
        {!selectedConversation ? <NoChatSelected /> : (
            <>
            <div className='bg-slate-500 px-4 py-2 mb-2 mx-2'>
                <span className='label-text p-2 text-gray-300'>To :</span>
                <span className='text-grey-100 font-bold text-gray-300'>{selectedConversation.fullname}</span>
            </div>
            <Messages />
            <MessageInput />
            </>
        )}
    </div>
  )
}
const NoChatSelected = () => {
	const { authUser } = useAuthContext();
  console.log(authUser.fullname)
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋{authUser.fullname}❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
export default MessageContainer