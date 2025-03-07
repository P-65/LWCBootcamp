import { LightningElement } from "lwc";

export default class ParentCustomEventDemo extends LightningElement {
  displayMessage = false;

  displayMessageHandler() {
    this.displayMessage = true;
  }
}
