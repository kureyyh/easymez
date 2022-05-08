import express, { Request, Response } from "express";
import { NotFoundError, requireAuth } from "@kursat38tr/common";
import { Messages } from "../model/message";
import { Chat } from "../model/chat";

const router = express.Router();
router.get(
  "/api/message/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const clientId = req.params.clientId;
    const senderMessage = await Chat.find({ clientId: clientId }).populate(
      "message"
    );

    if (!senderMessage) {
      throw new NotFoundError();
    }

    res.send(senderMessage);
  }
);

export { router as showMessageRouter };
