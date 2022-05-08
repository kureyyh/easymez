import {
  FacebookMessageCreatedEvent,
  Listener,
  Subjects,
} from "@kursat38tr/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Messages } from "../../model/message";
import { Client, ClientDoc } from "../../model/client";
import { Organisation, OrganisationDoc } from "../../model/organisation";
import { Chat } from "../../model/chat";

export class FacebookMessageCreatedListener extends Listener<FacebookMessageCreatedEvent> {
  subject: Subjects.FacebookMessageCreated = Subjects.FacebookMessageCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: FacebookMessageCreatedEvent["data"], msg: Message) {
    console.log(data);
    const findClient = await Client.findOne({ clientId: data.sender });

    const client = await Client.build({
      clientId: data.sender,
    });

    if (!findClient) {
      await client.save();
    }

    // Find organisation
    const findOrganisation = await Organisation.findOne({
      organisationId: data.recipient,
    });

    // Create organisation If not exist
    const organisation = Organisation.build({
      organisationId: data.recipient,
    });

    if (!findOrganisation) {
      await organisation.save();
    }

    // Create Message
    const message = await Messages.build({
      sender: data.sender,
      recipient: data.recipient,
      timestamp: data.timestamp,
      text: data.text,
    });
    await message.save();

    const newChat = Chat.build({
      client,
      organisation,
      message,
    });

    await newChat.save();

    msg.ack();
  }
}
