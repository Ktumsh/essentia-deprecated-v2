import React from "react";

import { StarIcon } from "../icons/icons";

import { useSession } from "next-auth/react";
import { Avatar, AvatarIcon, Image } from "@nextui-org/react";

interface Message {
  id: string;
  text: string;
  sender: string;
}

interface MessageListProps {
  messages: Message[];
  intro: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, intro }) => {
  const { data: session } = useSession();
  return (
    <div className="message-list-container pb-32 sm:py-24 pt-4">
      <div className="relative h-full mx-auto max-w-2xl px-4">
        {intro ? (
          <div className="pb-[200px] pt-4 md:pt-10">
            <div className="mx-auto max-w-2xl px-4">
              <div className="bg-white dark:bg-base-dark flex flex-col gap-2 rounded-lg border border-gray-200 dark:border-white/10 p-8">
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg text-base-color-h dark:text-base-color-dark font-bold">
                    Bienvenido a Essentia AI
                  </h1>
                  <StarIcon className="size-3 text-yellow-400 dark:text-yellow-600" />
                </div>
                <p className="text-sm sm:text-base text-base-color-m dark:text-base-color-dark-m">
                  Haz preguntas sobre salud y bienestar, ejercicio, nutrición,
                  bienestar emocional, salud sexual y más. Recibe información
                  confiable y toma decisiones informadas sobre tu salud.
                </p>
              </div>
            </div>
            <div className="h-px w-full"></div>
          </div>
        ) : (
          <ul className="group flex flex-col h-full">
            {messages.map((message) => (
              <React.Fragment key={message.id}>
                <li
                  className={`group relative flex items-start font-dmsans message ${message.sender} ${
                    message.sender === "user"
                      ? "md:-mr-12 sm:self-end sm:flex-row-reverse"
                      : "md:-ml-12"
                  }`}
                >
                  <span className="user-image flex size-[25px] shrink-0 select-none items-center justify-center rounded-md bg-white dark:bg-base-dark border border-gray-200 dark:border-white/10 shadow-md overflow-hidden">
                    {message.sender === "user" ? (
                      session?.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt={`Imagen de usuario de: ${session.user.name}`}
                          classNames={{
                            img: "rounded-none",
                          }}
                        />
                      ) : (
                        <Avatar
                          showFallback
                          src="https://images.unsplash.com/broken"
                          size="sm"
                          icon={<AvatarIcon />}
                          classNames={{
                            icon: "text-base-color-m dark:text-base-color-dark-m",
                            base: "bg-gray-300 dark:bg-gray-800 rounded-none",
                            name: "font-medium text-base-color-h dark:text-base-color-dark-h",
                          }}
                        />
                      )
                    ) : message.sender === "bot" ? (
                      <Image
                        width="15"
                        height="15"
                        src="/e-logomark-on-dark.webp"
                        alt="Essentia AI"
                      />
                    ) : null}
                  </span>
                  <p
                    className={`${
                      message.sender === "user"
                        ? "ml-4 pl-2 sm:mr-4 sm:pr-2"
                        : "ml-4 pl-2"
                    } flex-1 space-y-2 overflow-hidden text-base-color-h dark:text-base-color-dark`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: message.text }} />
                  </p>
                </li>
                <div
                  role="none"
                  className="shrink-0 border-b border-white/80 dark:border-white/10 h-px w-full my-4 last:hidden"
                ></div>
              </React.Fragment>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MessageList;
