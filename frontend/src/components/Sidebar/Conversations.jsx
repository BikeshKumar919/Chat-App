import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'
import { getRandomEmoji } from '../../utils/emojis'
const Conversations = () => {
  const {loading, conversations} = useGetConversations()
  console.log(conversations)
  return (
    <div className='py-2 flex flex-col overflow-auto'>
        {
          conversations.map((conversation,index) => (
            <Conversation key={conversation._id} 
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={index === conversations.length - 1 }
            />
          ))
        }
    </div>
  )
}

export default Conversations