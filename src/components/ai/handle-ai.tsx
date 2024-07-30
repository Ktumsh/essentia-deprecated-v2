"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";

import { getCohereStream } from "@/services/ia";
import SidebarToggle from "./sidebar-toggle";
import ChatList from "./chat-list";
import MessageList from "./message-list";
import MessageInput from "./message-input";
import { Chat, Message } from "@/types/chat";
import {
  formatTextToHTML,
  generateChatNameFromFirstMessage,
} from "@/lib/utils";
import {
  clearChats,
  getChat,
  getChats,
  removeChat,
  saveChat,
} from "@/app/(main)/essentia-ai/actions";

const HandleAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [intro, setIntro] = useState(true);
  const [typing, setTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [currentBotMessage, setCurrentBotMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [currentSessionName, setCurrentSessionName] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [action, setAction] = useState<string | null>(null);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const threshold = 80;
  let startX: number | null = null;
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const handleTouchStart = (event: React.TouchEvent) => {
    startX = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (!startX) return;
    const touch = event.touches[0];
    const diffX = touch.clientX - startX;

    if (diffX > threshold && !sidebarOpen) {
      setSidebarOpen(true);
    }

    if (diffX < -threshold && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const handleTouchEnd = () => {
    startX = null;
  };

  const updateBodyClass = (isOpen: boolean) => {
    const body = document.querySelector("body");
    if (isOpen) {
      body?.classList.add("overflow-hidden");
    } else {
      body?.classList.remove("overflow-hidden");
    }

    const overlay = document.querySelector("#overlayModal");
    if (isOpen) {
      overlay?.classList.remove("invisible", "opacity-0");
    } else {
      overlay?.classList.add("invisible", "opacity-0");
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    updateBodyClass(sidebarOpen);
  }, [sidebarOpen]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const inputEl = document.getElementById(
      "message-input"
    ) as HTMLInputElement;
    const text = inputEl.value.trim();
    if (text) {
      addMessage(text, "user");
      inputEl.value = "";
      try {
        setIntro(false);
        setIsSending(true);
        setTyping(true);
        setCurrentBotMessage("");
        addTypingIndicator();

        await getCohereStream(text, (update: string) => {
          setCurrentBotMessage(update);
          updateTypingMessage(formatTextToHTML(update), "bot");
        });

        finalizeBotMessage();
        setTyping(false);
        setIsSending(false);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        addMessage("Hubo un error al obtener la respuesta de la IA.", "bot");
        removeTypingIndicator();
        setTyping(false);
        setIsSending(false);
      }
    }
  };

  const addMessage = (text: string, sender: "user" | "bot") => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: generateId(), text, sender },
    ]);
  };

  const addTypingIndicator = () => {
    if (!messages.some((message) => message.typing)) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: generateId(),
          text: "...",
          sender: "bot",
          typing: true,
        },
      ]);
    }
  };

  const removeTypingIndicator = () => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => !message.typing)
    );
  };

  const updateTypingMessage = (text: string, sender: "user" | "bot") => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      if (lastMessage && lastMessage.typing) {
        lastMessage.text = text;
      } else {
        addMessage(text, sender);
      }
      return [...prevMessages];
    });
  };

  const generateId = () => {
    const id = "_" + Math.random().toString(36).substring(2, 9);
    return id;
  };

  const finalizeBotMessage = () => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      if (lastMessage && lastMessage.typing) {
        lastMessage.typing = false;
      }
      return [...prevMessages];
    });

    if (!selectedSessionId) {
      const newId = generateId();
      setSelectedSessionId(newId);
    }

    const firstUserMessage = generateChatNameFromFirstMessage(messages);

    const currentSessionIndex = chatHistory.findIndex(
      (session) => session.sessionId === selectedSessionId
    );

    let updatedHistory = [...chatHistory];

    if (currentSessionIndex !== -1) {
      updatedHistory[currentSessionIndex] = {
        ...updatedHistory[currentSessionIndex],
        name: firstUserMessage || "Nuevo chat",
        messages: [...messages],
        dateTime: new Date().toLocaleString("es-ES"),
      };
    } else {
      const newSession: Chat = {
        sessionId: selectedSessionId,
        name: firstUserMessage || "Nuevo chat",
        dateTime: new Date().toLocaleString("es-ES"),
        messages: [...messages],
      };
      updatedHistory = [...updatedHistory, newSession];
    }

    updatedHistory = updatedHistory.filter((session) => session.sessionId);

    setChatHistory(updatedHistory);
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
  };

  useEffect(() => {
    if (messages.length > 0) {
      saveChat({
        messages,
        chatHistory,
        selectedSessionId,
        currentSessionName,
        setCurrentSessionName,
        setChatHistory,
      });
    }
  }, [messages]);

  const getChatHistory = () => {
    getChats(setChatHistory);
  };

  const getChatSession = (sessionId: string) => {
    getChat(
      {
        chatHistory,
        messageContainerRef,
        setSelectedSessionId,
        setMessages,
        setIntro,
        setShowScrollButton,
      },
      sessionId
    );
  };

  const confirmDeleteChat = (sessionId: string) => {
    setChatToDelete(sessionId);
    setAction("single");
  };

  const confirmDeleteAllChats = () => {
    setAction("all");
  };

  const executeDelete = () => {
    if (action === "single") {
      deleteChat();
    } else if (action === "all") {
      deleteAllChats();
    }
    closeModal();
  };

  const deleteChat = () => {
    removeChat({
      chatToDelete,
      setChatToDelete,
      setChatHistory,
      chatHistory,
    });
  };

  const deleteAllChats = () => {
    clearChats(setChatHistory);
  };

  const closeModal = () => {
    setChatToDelete(null);
  };

  const handleScroll = () => {
    if (messageContainerRef.current) {
      setShowScrollButton(
        messageContainerRef.current.scrollTop <
          messageContainerRef.current.scrollHeight -
            messageContainerRef.current.clientHeight
      );
    }
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scroll({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setSidebarOpen(window.innerWidth >= 1024);
    updateBodyClass(sidebarOpen);

    const overlay = document.querySelector("#overlayModal");
    overlay?.addEventListener("click", () => {
      setSidebarOpen(false);
      updateBodyClass(false);
    });

    if (messageContainerRef.current) {
      messageContainerRef.current.addEventListener("scroll", handleScroll);
    }
    handleScroll();
    getChatHistory();
  }, []);

  return (
    <>
      <div
        id="chat-container"
        className="flex size-full lg:h-[calc(100dvh-80px)] mt-20 sm:mt-0 text-white overflow-hidden"
      >
        <SidebarToggle
          toggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        <ChatList
          action={action}
          chatHistory={chatHistory}
          selectedSessionId={selectedSessionId}
          confirmDeleteChat={confirmDeleteChat}
          executeDelete={executeDelete}
          getChatSession={getChatSession}
          confirmDeleteAllChats={confirmDeleteAllChats}
          sidebarOpen={sidebarOpen}
          handleTouchStart={handleTouchStart}
          handleTouchMove={handleTouchMove}
          handleTouchEnd={handleTouchEnd}
          toggleSidebar={toggleSidebar}
        />
        <div
          ref={messageContainerRef}
          className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px] transition-[padding]"
        >
          <MessageList messages={messages} intro={intro} />

          <MessageInput
            handleSubmit={handleSubmit}
            isSending={isSending}
            scrollToBottom={scrollToBottom}
            showScrollButton={showScrollButton}
          />
        </div>
      </div>
    </>
  );
};

export default HandleAI;
