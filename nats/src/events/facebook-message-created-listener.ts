import { Message } from "node-nats-streaming";
import { Listener } from "../../../common/src/events/base-listener";
import { Subjects } from "../../../common/src/events/subjects";
import { FacebookMessageCreatedEvent } from "../../../common/src/events/facebook-message-created-event";

export class FacebookMessageCreatedListener extends Listener<FacebookMessageCreatedEvent> {
  subject: Subjects.FacebookMessageCreated = Subjects.FacebookMessageCreated;
  queueGroupName = "message-service";

  onMessage(data: FacebookMessageCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);

    msg.ack();
  }
}
