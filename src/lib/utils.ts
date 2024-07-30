import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Message } from "@/types/chat";

export const getFirstNameAndLastName = (
  fullName: string | undefined | null
) => {
  if (!fullName) return "Usuario";
  const nameParts = fullName.toLowerCase().split(" ");
  if (nameParts.length < 3) return capitalize(fullName);
  return `${capitalize(nameParts[0])} ${capitalize(nameParts[nameParts.length - 2])}`;
};

export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const normalizedPathName = (pathname: string): string => {
  return pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
};

/* export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
); */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateChatNameFromFirstMessage = (messages: Message[]) => {
  const firstUserMessage = messages.find(
    (message) => message.sender === "user"
  );
  return firstUserMessage
    ? firstUserMessage.text.substring(0, 20)
    : "Chat sin título";
};

export const formatTextToHTML = (text: string) => {
  text = text.replace(/\*\*/g, "");

  const paragraphs = text
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
  let firstParagraph = true;

  const formattedParagraphs = paragraphs.map((paragraph) => {
    if (paragraph.startsWith("- ")) {
      const items = paragraph.split("- ").filter((item) => item.length > 0);
      return `<ul class="list-disc list-inside">${items
        .map((item) => {
          if (item.includes(":")) {
            const parts = item.split(":");
            return `<li><strong class="font-medium">${parts[0].trim()}</strong>: ${parts
              .slice(1)
              .join(":")
              .trim()}</li>`;
          }
          return `<li>${item.trim()}</li>`;
        })
        .join("")}</ul>`;
    }
    if (paragraph.includes(":") && !firstParagraph) {
      const parts = paragraph.split(":");
      return `<p><strong class="font-medium">${parts[0].trim()}</strong>: ${parts
        .slice(1)
        .join(":")
        .trim()}</p>`;
    }
    firstParagraph = false;
    return `<p>${paragraph}</p>`;
  });

  return formattedParagraphs.join("<br>");
};

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

export enum ResultCode {
  InvalidCredentials = "INVALID_CREDENTIALS",
  InvalidSubmission = "INVALID_SUBMISSION",
  UserAlreadyExists = "USER_ALREADY_EXISTS",
  UnknownError = "UNKNOWN_ERROR",
  UserCreated = "USER_CREATED",
  UserLoggedIn = "USER_LOGGED_IN",
}

export const usernameOrEmail = (session: any) => {
  const username = session?.user?.username
    ? `@${session.user.username}`
    : session?.user?.email;

  return username;
};
