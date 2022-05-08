import express, { Request, Response } from "express";
import { Messages } from "../model/message";
import { currentUser, requireAuth } from "@kursat38tr/common";
import { Chat } from "../model/chat";
// const keycloak = require("../config/keycloak-config.js").getKeycloak();

const router = express.Router();

router.get("/api/message", requireAuth, async (req: Request, res: Response) => {
  const messages = await Chat.find();
  res.send(messages);
});

export { router as indexMessageRouter };
