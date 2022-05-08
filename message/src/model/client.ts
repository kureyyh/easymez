import mongoose from "mongoose";

interface ClientAttrs {
  clientId: string;
}

export interface ClientDoc extends mongoose.Document {
  clientId: string;
}

interface ClientModel extends mongoose.Model<ClientDoc> {
  build(attrs: ClientAttrs): ClientDoc;
}

const ClientSchema = new mongoose.Schema(
  {
    clientId: {
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

ClientSchema.statics.build = (attrs: ClientAttrs) => {
  return new Client(attrs);
};

const Client = mongoose.model<ClientDoc, ClientModel>("Client", ClientSchema);

export { Client, ClientSchema };
