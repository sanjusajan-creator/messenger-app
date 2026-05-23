import { Trash2, XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader({ onBack }) {
  const { selectedUser, setSelectedUser, clearChatByUserId } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const isOnline = onlineUsers.includes(selectedUser._id);
  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
      return;
    }
    setSelectedUser(null);
  }, [onBack, setSelectedUser]);
  const handleClearChat = useCallback(() => {
    if (!selectedUser?._id) return;
    clearChatByUserId(selectedUser._id);
    setIsClearModalOpen(false);
  }, [clearChatByUserId, selectedUser]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key !== "Escape") return;
      if (isClearModalOpen) {
        setIsClearModalOpen(false);
        return;
      }
      handleBack();
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [handleBack, isClearModalOpen]);

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

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsClearModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 transition-colors"
          aria-label="Clear chat"
          title="Clear chat"
          type="button"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
          onClick={handleBack}
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 transition-colors"
          aria-label="Close chat"
          title="Close chat"
          type="button"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>

      {isClearModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Clear chat confirmation"
          onClick={() => setIsClearModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-slate-700/60 bg-slate-900/95 p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-rose-500/15 text-rose-400">
                <Trash2 className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-slate-100 text-base font-semibold">Clear this chat?</h4>
                <p className="mt-1 text-sm text-slate-400">
                  This will remove all messages between you and {selectedUser.fullName}.
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                className="inline-flex items-center justify-center rounded-md border border-slate-700/70 px-3.5 py-2 text-sm text-slate-200 hover:bg-slate-800/70 transition-colors"
                onClick={() => setIsClearModalOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center rounded-md bg-rose-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-rose-500 transition-colors"
                onClick={handleClearChat}
                type="button"
              >
                Clear chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ChatHeader;
