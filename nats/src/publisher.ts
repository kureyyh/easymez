import nats from "node-nats-streaming";
import { FacebookMessageCreatedPublisher } from "./events/facebook-message-created-publisher";
console.clear();

const stan = nats.connect("easymez", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Connected to nats");

  const publisher = new FacebookMessageCreatedPublisher(stan);
  try {
    await publisher.publish({
      sender: "string",
      recipient: "string",
      timestamp: "string",
      messageDetail: {
        mid: "sad",
        text: "asd",
      },
    });
  } catch (err) {
    console.error(err);
  }

  // const data = JSON.stringify({
  //   sender: "string",
  //   recipient: "string",
  //   timestamp: "string",
  //   messageDetail: {
  //     mid: "string",
  //     text: "string",
  //   },
  // });
  //
  // stan.publish("facebook-message:created", data, () => {
  //   console.log("Event Published");
  // });
});
