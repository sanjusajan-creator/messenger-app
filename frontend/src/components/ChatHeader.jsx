import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useCallback, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader({ onBack }) {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);
  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
      return;
    }
    setSelectedUser(null);
  }, [onBack, setSelectedUser]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") handleBack();
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [handleBack]);

  return (
    <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 px-6 py-4">
      <div className="flex items-center space-x-3">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-10 sm:w-12 rounded-full">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>

        <div>
          <h3 className="text-slate-200 font-medium text-sm sm:text-base">
            {selectedUser.fullName}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm">{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>

      <button onClick={handleBack}>
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
}
export default ChatHeader;
