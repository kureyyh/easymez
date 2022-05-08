import mongoose from "mongoose";

interface MessageAttrs {
  sender: string;
  recipient: string;
  timestamp: string;
  text: string;
}

export interface MessageDoc extends mongoose.Document {
  sender: string;
  recipient: string;
  timestamp: string;
  text: string;
}

interface MessageModel extends mongoose.Model<MessageDoc> {
  build(attrs: MessageAttrs): MessageDoc;
}

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
    },
    recipient: {
      type: String,
    },
    timestamp: {
      type: String,
    },
    text: {
      type: String,
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

messageSchema.statics.build = (attrs: MessageAttrs) => {
  return new Messages(attrs);
};

const Messages = mongoose.model<MessageDoc, MessageModel>(
  "Messages",
  messageSchema
);

export { Messages };
