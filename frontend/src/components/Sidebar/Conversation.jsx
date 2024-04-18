import useConversations from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext'


const Conversation = ({conversation,emoji,lastIdx}) => {
	const {selectedConversation, setSelectedConversation} = useConversations()
	const isSelected = selectedConversation?._id === conversation._id
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);
     	return (
     		<>
     			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected && 'bg-sky-500'}
				`}
				onClick={() => setSelectedConversation(conversation)}
				>
     				<div className={`avatar ${isOnline ? "online" : ""}`}>
     					<div className='w-12 rounded-full'>
     						<img
     							src={conversation.profilePic}
     							alt='user avatar'
     						/>
     					</div>
     				</div>
    
     				<div className='flex flex-col flex-1'>
     					<div className='flex gap-3 justify-between'>
     						<p className='font-bold text-gray-300'>{conversation.fullname}</p>
     						<span className='text-xl'>{emoji}</span>
     					</div>
     				</div>
     			</div>
    
     			{!lastIdx && <div className='border-b border-gray-600'></div>}
     		</>
     	);
     };
     export default Conversation;