import { LightningElement, wire } from "lwc";
import getContactsList from "@salesforce/apex/ContactController.getContactsList";
// Import message service features required for publishing and the message channel
import { publish, MessageContext } from "lightning/messageService";
import recordSelected from "@salesforce/messageChannel/sendContact__c";

export default class ContactListComponent extends LightningElement {
  selectedRecord;
  @wire(getContactsList) contacts;
  @wire(MessageContext)
  messageContext;

  handleSelection(event) {
    let selectedId = event.detail;
    this.selectedRecord = this.contacts.data.find(
      (currItem) => currItem.Id === selectedId
    );
    console.log("this.selectedRecord", this.selectedRecord);
    const payload = { lmsData: this.selectedRecord };

    publish(this.messageContext, recordSelected, payload);
  }
}
