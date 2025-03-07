import { LightningElement } from "lwc";

export default class ChildCustomEventDemo extends LightningElement {
  clickHandler() {
    // 1. Create custom event
    const myEvent = new CustomEvent("displaymsg");

    // 2. Dispatch custom event
    this.dispatchEvent(myEvent);
  }
}
