import { Button, Tooltip, useDisclosure } from "@nextui-org/react";

import { ChatIcon, DeleteIcon, NewIcon, SidebarFillIcon } from "../icons/icons";

import DeleteChatModal from "./chat-options-menu";

interface ChatSession {
  sessionId: string;
  name: string;
  dateTime: string;
  messages: any[];
}

interface ChatListProps {
  action: string | null;
  chatHistory: ChatSession[];
  selectedSessionId: string;
  getChatSession: (sessionId: string) => void;
  confirmDeleteChat: (sessionId: string) => void;
  confirmDeleteAllChats: () => void;
  executeDelete: () => void;
  sidebarOpen: boolean;
  handleTouchStart: (event: React.TouchEvent) => void;
  handleTouchMove: (event: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  toggleSidebar: () => void;
}

const ChatList: React.FC<ChatListProps> = ({
  action,
  chatHistory,
  selectedSessionId,
  getChatSession,
  confirmDeleteChat,
  confirmDeleteAllChats,
  executeDelete,
  sidebarOpen,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  toggleSidebar,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div
        id="chat-menu"
        data-state={sidebarOpen ? "open" : "closed"}
        className={`${
          sidebarOpen ? "open" : "closed"
        } peer transition-transform absolute left-0 inset-y-0 flex flex-col w-[300px] h-full items-start p-3 pt-[68px] border-r border-gray-200 dark:border-white/10 bg-white dark:bg-base-dark backdrop-blur backdrop-saturate-150 text-base-color dark:text-base-color-dark z-[1000] lg:z-10`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-between w-full h-10 mb-4">
          <Tooltip
            content="Cerrar barra lateral"
            delay={800}
            closeDelay={0}
            classNames={{
              content:
                "bg-gradient-to-br from-white to-gray-300 dark:from-base-dark dark:to-base-full-dark text-xs text-base-color-h dark:text-base-color-dark-h",
            }}
          >
            <button
              onClick={toggleSidebar}
              className="h-10 rounded-lg px-2 text-base-color-h dark:text-base-color-dark-h hover:bg-gray-200 dark:hover:bg-base-full-dark transition-colors duration-150"
            >
              <SidebarFillIcon />
            </button>
          </Tooltip>
        </div>

        <div className="relative flex flex-col inner-scrollbar size-full gap-1.5 overflow-y-auto">
          <div className="mb-2">
            <a
              className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium font-motivasans focus-visible:outline-none border border-gray-200 dark:border-base-full-dark hover:text-base-color dark:hover:text-white py-2 h-10 w-full justify-start bg-gray-50 px-4 shadow-none transition-colors hover:bg-gray-100 dark:bg-base-full-dark-20 dark:hover:bg-base-full-dark"
              href="/essentia-ai"
            >
              <NewIcon className="size-4 -translate-x-2 stroke-2" />
              Nuevo chat
            </a>
          </div>
          {chatHistory.length > 0 ? (
            chatHistory.map((session) => (
              <div
                key={session.sessionId}
                className={`chat-item group relative w-full gap-1 text-base-color-h dark:text-base-color-dark-h hover:text-base-color dark:hover:text-white hover:bg-gray-100 dark:hover:bg-base-full-dark rounded-md transition-colors duration-150 overflow-hidden ${
                  session.sessionId === selectedSessionId
                    ? "active bg-gray-200 dark:bg-base-full-dark"
                    : ""
                }`}
              >
                <div className="absolute left-2 top-1 flex size-6 items-center justify-center">
                  <ChatIcon className="size-4 mr-2 mt-2 text-base-color-d dark:text-base-color-dark-d" />
                </div>
                <button
                  onClick={() => getChatSession(session.sessionId)}
                  className="inline-flex flex-col justify-center w-full text-sm px-8 py-2 pr-10 whitespace-nowrap font-dmsans font-semibold"
                >
                  <div className="w-full relative flex-1 max-h-5 text-start text-ellipsis overflow-hidden break-all select-none">
                    <span className="whitespace-nowrap">
                      <Tooltip
                        showArrow
                        content={session.name}
                        placement="right-end"
                        delay={800}
                        closeDelay={0}
                        classNames={{
                          base: "before:bg-white dark:before:bg-base-dark",
                          content:
                            "bg-gradient-to-br from-white to-gray-300 dark:from-base-dark dark:to-base-full-dark text-xs text-base-color-h dark:text-base-color-dark-h",
                        }}
                      >
                        <span>{session.name}</span>
                      </Tooltip>
                    </span>
                  </div>
                  <span className="text-[10px] text-base-color-m dark:text-base-color-dark-m">
                    {session.dateTime}
                  </span>
                  <div className="absolute inset-y-0 to-transparent right-0 bg-white dark:bg-base-dark group-hover:gray-200 dark:group-hover:bg-base-full-dark group-[.active]:bg-gray-200 dark:group-[.active]:bg-base-full-dark"></div>
                </button>

                <Tooltip
                  content="Borrar chat"
                  delay={800}
                  closeDelay={0}
                  classNames={{
                    content:
                      "bg-gradient-to-br from-white to-gray-300 dark:from-base-dark dark:to-base-full-dark text-xs text-base-color-h dark:text-base-color-dark-h",
                  }}
                >
                  <Button
                    variant="light"
                    disableRipple
                    radius="sm"
                    className="min-w-fit group flex items-center justify-center size-7 p-0 my-auto mr-2 dark:hover:text-white data-[hover=true]:bg-white absolute inset-y-0 right-0 gap-1.5 opacity-0 group-hover:opacity-100 group-[.selected]:opacity-100 group-[.active]:opacity-100 transition-opacity duration-150"
                    aria-haspopup="menu"
                    endContent={<DeleteIcon className="size-4" />}
                    onClick={() => confirmDeleteChat(session.sessionId)}
                    onPress={onOpen}
                  ></Button>
                </Tooltip>
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center px-2">
              <p className="text-base-color-d dark:text-base-color-dark-d text-center text-sm">
                Sin historial de chat
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end w-full h-10 mt-4">
          <Button
            onClick={confirmDeleteAllChats}
            onPress={onOpen}
            variant="light"
            disabled={chatHistory.length === 0}
            className="h-10 rounded-xl px-3 font-medium text-sm text-base-color-h dark:text-base-color-dark-h disabled:pointer-events-none disabled:opacity-50 data-[hover=true]:bg-transparent"
          >
            Limpiar historial
          </Button>
        </div>
      </div>
      <DeleteChatModal
        action={action}
        executeDelete={executeDelete}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default ChatList;
