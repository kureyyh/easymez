import mongoose from "mongoose";
import { ClientDoc } from "./client";
import { OrganisationDoc } from "./organisation";
import { MessageDoc } from "./message";

interface ChatAttrs {
  client: ClientDoc;
  organisation: OrganisationDoc;
  message: MessageDoc;
}

export interface ChatDoc extends mongoose.Document {
  client: ClientDoc;
  organisation: OrganisationDoc;
  message: MessageDoc;
}

interface ChatModel extends mongoose.Model<ChatDoc> {
  build(attrs: ChatAttrs): ChatDoc;
}

const ChatSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organisation",
    },
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ChatSchema.statics.build = (attrs: ChatAttrs) => {
  return new Chat(attrs);
};

const Chat = mongoose.model<ChatDoc, ChatModel>("Chat", ChatSchema);

export { Chat, ChatSchema };
