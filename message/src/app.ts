import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import cookieSession from "cookie-session";

import { currentUser, errorHandler, NotFoundError } from "@kursat38tr/common";
import { indexMessageRouter } from "./routes";
import { showMessageRouter } from "./routes/show";
import { postMessageRouter } from "./routes/post";
// const keycloak = require("./config/keycloak-config.js").initKeycloak();

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

// app.use(keycloak.middleware());
app.use(currentUser);
app.use(indexMessageRouter);
app.use(showMessageRouter);
app.use(postMessageRouter);

app.get("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
