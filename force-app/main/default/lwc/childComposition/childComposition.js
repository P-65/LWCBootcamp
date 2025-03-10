import { LightningElement } from "lwc";

export default class ChildComposition extends LightningElement {
  fireChildEvent() {
    let myCustomEvent = new CustomEvent("fire", {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(myCustomEvent);
  }
}
