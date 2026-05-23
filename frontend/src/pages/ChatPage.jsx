import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer'
import { useChatStore } from '../store/useChatStore';
import ProfileHeader from '../components/ProfileHeader';
import ChatList from '../components/ChatList';
import ContactsList from '../components/ContactsList';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import NoConversationPlaceHolder from '../components/NoConversationPlaceHolder';
import ChatContainer from '../components/ChatContainer';

function ChatPage() {
  const { logout } = useAuthStore();
  const { activeTab, selectedUser } = useChatStore();
  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      
      <BorderAnimatedContainer>
      <div className='w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col '>
      <ProfileHeader />
      <ActiveTabSwitch />

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {activeTab === "chats" ? <ChatList /> : <ContactsList />}
      </div>
      </div>

      <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">{selectedUser ? <ChatContainer /> : <NoConversationPlaceHolder />}
      </div>

      </BorderAnimatedContainer>

    </div>
  )
}

export default ChatPage