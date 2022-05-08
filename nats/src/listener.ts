import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { FacebookMessageCreatedListener } from "./events/facebook-message-created-listener";

console.clear();

const stan = nats.connect("easymez", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to nats");

  // Disconnected nats
  stan.on("close", () => {
    console.log("Nats connection closed");
    process.exit();
  });

  new FacebookMessageCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
