import { Publisher } from "../../../common/src/events/base-publisher";
import { FacebookMessageCreatedEvent } from "../../../common/src/events/facebook-message-created-event";
import { Subjects } from "../../../common/src/events/subjects";

export class FacebookMessageCreatedPublisher extends Publisher<FacebookMessageCreatedEvent> {
  readonly subject = Subjects.FacebookMessageCreated;
}
