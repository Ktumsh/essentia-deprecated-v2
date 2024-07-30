export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  imageUrl?: string;
  typing?: boolean;
}

export interface Chat extends Record<string, any> {
  sessionId: string;
  name: string;
  dateTime: string;
  messages: Message[];
}
