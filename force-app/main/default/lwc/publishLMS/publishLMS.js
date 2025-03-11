import { LightningElement, wire } from "lwc";
// Import message service features required for publishing and the message channel
import { publish, MessageContext } from "lightning/messageService";
import recordSelected from "@salesforce/messageChannel/sendMessage__c";

export default class PublishLMS extends LightningElement {
  @wire(MessageContext)
  messageContext;

  publishMessage() {
    const payload = { lmsData: "Welcome from Publish LMS" };

    publish(this.messageContext, recordSelected, payload);
  }
}
