import mongoose, {Document, Schema} from "mongoose";

export interface IMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
};

export interface IChat extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    messages: IMessage[];
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
    role: {type: String, enum: ['user', 'assistant']},
    content: {type: String, required: true},
    timestamp: {type: Date, default: Date.now},
});

const chatSchema = new Schema<IChat>({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, default: 'New Conversation'},
    messages: [messageSchema]
}, {timestamps: true});

export const Chat = mongoose.model<IChat>('Chat', chatSchema);