import express, { Request, Response } from "express";
import { natsWrapper } from "../nats-wrapper";
import { MessageCreatedPublisher } from "../events/publishers/message-created-publisher";
import { NotFoundError, requireAuth } from "@kursat38tr/common";
import { FacebookMessageCreatedListener } from "../events/listeners/facebook-message-created-listener";
import { MessageDoc, Messages } from "../model/message";
import { Chat } from "../model/chat";
import { Client } from "../model/client";
// /
const router = express.Router();

router.post(
  "/api/message",
  requireAuth,
  async (req: Request, res: Response) => {
    // let messages: any;

    const { id, message } = req.body;

    const newDate = JSON.stringify(Date.now());

    const findClient = await Chat.findOne({ clientId: id });

    if (!findClient) {
      throw new NotFoundError();
    }

    const findChat = await Chat.findOne({ clientId: findClient })
      .populate("message")
      .populate("client")
      .populate("organisation");

    // console.log(findChat!.message.recipient);

    res.send(findChat);
    new MessageCreatedPublisher(natsWrapper.client).publish({
      sender: findChat!.organisation.organisationId,
      recipient: findChat!.client.clientId,
      timestamp: newDate,
      text: message,
    });
  }
);

export { router as postMessageRouter };
