import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-[calc(100vh-2rem)]">
      <BorderAnimatedContainer>
        {/* LEFT SIDE */}
        <div className="w-full md:w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col h-full min-h-0">
          <div
            className={`flex flex-col flex-1 min-h-0 ${
              selectedUser ? "hidden md:flex" : "flex"
            }`}
          >
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          <div
            className={`flex-1 min-h-0 flex flex-col md:hidden ${
              selectedUser ? "flex" : "hidden"
            }`}
          >
            <ChatContainer />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex flex-1 min-h-0 flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}
export default ChatPage;
//dsfsfsfffh
