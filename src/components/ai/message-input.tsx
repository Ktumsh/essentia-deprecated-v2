import { cn } from "@/lib/utils";
import { ArrowUpIcon, LinkIcon } from "../icons/icons";

interface MessageInputProps {
  handleSubmit: (event: React.FormEvent) => Promise<void>;
  isSending: boolean;
  scrollToBottom: () => void;
  showScrollButton: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  handleSubmit,
  isSending,
  scrollToBottom,
  showScrollButton,
}) => {
  return (
    <div className="w-full fixed inset-x-0 bottom-14 md:bottom-0 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px] transition-[padding]">
      <button
        className={cn(
          showScrollButton ? "opacity-100" : "opacity-0",
          "group/button flex items-center justify-center size-9 absolute -top-10 sm:top-0 right-4 sm:right-8 rounded-md shadow-md hover:shadow-lg text-base-color dark:text-base-color-dark hover:text-bittersweet-400 bg-white dark:bg-base-dark dark:hover:bg-base-full-dark border border-gray-200 dark:border-white/10 hover:border-bittersweet-400 hover:scale-105 motion-safe:transition transition z-10"
        )}
        onClick={scrollToBottom}
      >
        <ArrowUpIcon className="size-4 rotate-[135deg] group-hover/button:rotate-180 transition-transform" />
        <span className="sr-only">Scroll to bottom</span>
      </button>
      <div className="mx-auto max-w-2xl sm:px-4 lg:pr-4 lg:pl-2">
        <div className="bg-white dark:bg-base-dark space-y-4 border-t px-4 py-2 shadow-lg sm:rounded-t-xl sm:border border-gray-200 dark:border-white/10 md:py-4">
          <form
            onSubmit={handleSubmit}
            className="message-input-container font-dmsans"
          >
            <div className="relative flex items-center justify-center size-full bg-white dark:bg-base-dark sm:border border-gray-200 dark:border-white/10 sm:rounded-md">
              <input
                id="message-input"
                autoComplete="off"
                className="grow min-h-[60px] py-2 px-5 mr-2 sm:text-sm border-none outline-none bg-transparent text-base-color dark:text-base-color-dark"
                placeholder="Escribe tu mensaje."
              />
              <button
                id="send-btn"
                type="submit"
                className="absolute right-0 top-[13px] sm:right-4 flex items-center justify-center size-9 mx-2 shadow-md disabled:opacity-60 disabled:pointer-events-none bg-bittersweet-400 dark:bg-cerise-red-600 text-white dark:text-base-dark rounded-full hover:brightness-90 text-sm"
                disabled={isSending}
              >
                <ArrowUpIcon />
              </button>
            </div>
          </form>
          <p className="text-base-color-d dark:text-base-color-dark-d px-2 text-center text-xs leading-normal hidden sm:block font-dmsans">
            Impulsado por el modelo
            <a
              href="https://cohere.com/command"
              target="_blank"
              className="inline-flex flex-1 justify-center gap-1 leading-4 hover:underline"
            >
              <span>command-r-plus</span>
              <LinkIcon />
            </a>
            de
            <a
              href="https://cohere.com/"
              target="_blank"
              className="inline-flex flex-1 justify-center gap-1 leading-4 hover:underline"
            >
              <span>Cohere</span>
              <LinkIcon />
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
