export interface IMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface IChat {
  _id: string;
  userId: string;
  title: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatPreview {
  _id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
