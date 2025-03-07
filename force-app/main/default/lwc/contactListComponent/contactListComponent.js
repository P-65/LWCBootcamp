import { LightningElement, wire } from "lwc";
import getContactsList from "@salesforce/apex/ContactController.getContactsList";

export default class ContactListComponent extends LightningElement {
  selectedRecord;
  @wire(getContactsList) contacts;

  handleSelection(event) {
    let selectedId = event.detail;
    this.selectedRecord = this.contacts.data.find(
      (currItem) => currItem.Id === selectedId
    );
    console.log("this.selectedRecord", this.selectedRecord);
  }
}
