import { LightningElement, api } from "lwc";

export default class ContactItemComponent extends LightningElement {
  @api contact;

  clickHandler(event) {
    //prevent anchor element from navigating to a new page
    event.preventDefault();

    //1. create event
    const selectionEvent = new CustomEvent("selection", {
      detail: this.contact.Id
    });

    //dispatch event
    this.dispatchEvent(selectionEvent);
  }
}
