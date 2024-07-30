import { Chat, Message } from "@/types/chat";
import { generateChatNameFromFirstMessage } from "@/lib/utils";

interface saveChatProps {
  messages: Message[];
  chatHistory: Chat[];
  selectedSessionId: string;
  currentSessionName: string;
  setCurrentSessionName: (name: string) => void;
  setChatHistory: (chatHistory: Chat[]) => void;
}

export async function saveChat({
  messages,
  chatHistory,
  selectedSessionId,
  currentSessionName,
  setCurrentSessionName,
  setChatHistory,
}: saveChatProps) {
  const now = new Date();
  const dateTime = `${now.toLocaleDateString("es-ES")} ${now.toLocaleTimeString(
    "es-ES",
    { hour: "2-digit", minute: "2-digit" }
  )}`;

  const existingSessionIndex = chatHistory.findIndex(
    (session) => session.sessionId === selectedSessionId
  );

  let updatedHistory = [...chatHistory];
  if (existingSessionIndex !== -1) {
    updatedHistory[existingSessionIndex].messages = messages;
    updatedHistory[existingSessionIndex].dateTime = dateTime;
  } else {
    if (!currentSessionName) {
      setCurrentSessionName(generateChatNameFromFirstMessage(messages));
    }
    const newSession: Chat = {
      sessionId: selectedSessionId,
      name: currentSessionName,
      dateTime,
      messages,
    };
    updatedHistory = [...updatedHistory, newSession];
  }

  setChatHistory(updatedHistory);
  localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
}

interface getChatProps {
  chatHistory: Chat[];
  messageContainerRef: React.RefObject<HTMLDivElement>;
  setSelectedSessionId: (sessionId: string) => void;
  setMessages: (messages: Message[]) => void;
  setIntro: (intro: boolean) => void;
  setShowScrollButton: (showScrollButton: boolean) => void;
}

export async function getChat(
  {
    chatHistory,
    messageContainerRef,
    setSelectedSessionId,
    setMessages,
    setIntro,
    setShowScrollButton,
  }: getChatProps,
  sessionId: string
) {
  setSelectedSessionId(sessionId);
  const selectedSession = chatHistory.find(
    (session) => session.sessionId === sessionId
  );
  if (selectedSession) {
    setMessages(selectedSession.messages);
    setIntro(false);
  }

  setTimeout(() => {
    if (messageContainerRef.current) {
      setShowScrollButton(
        messageContainerRef.current.scrollHeight >
          messageContainerRef.current.clientHeight
      );
    }
  }, 0);
}

export async function getChats(setChatHistory: (chatHistory: Chat[]) => void) {
  const savedHistory = localStorage.getItem("chatHistory");
  if (savedHistory) {
    setChatHistory(JSON.parse(savedHistory));
  }
}

export async function removeChat({
  chatToDelete,
  setChatToDelete,
  setChatHistory,
  chatHistory,
}: {
  chatToDelete: string | null;
  setChatToDelete: (chatToDelete: string | null) => void;
  setChatHistory: any;
  chatHistory: Chat[];
}) {
  setChatHistory((prevHistory: Chat[]) =>
    prevHistory.filter((session) => session.sessionId !== chatToDelete)
  );
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  setChatToDelete(null);
}

export async function clearChats(
  setChatHistory: (chatHistory: Chat[]) => void
) {
  setChatHistory([]);
  localStorage.setItem("chatHistory", JSON.stringify([]));
}
