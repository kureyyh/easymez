import { MessageCreatedEvent, Publisher, Subjects } from "@kursat38tr/common";

export class MessageCreatedPublisher extends Publisher<MessageCreatedEvent> {
  subject: Subjects.MessageCreated = Subjects.MessageCreated;
}
