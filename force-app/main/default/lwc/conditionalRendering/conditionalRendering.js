import { LightningElement } from "lwc";

export default class ConditionalRendering extends LightningElement {
  displayMessage = false;

  handleChange() {
    //toggle handling in JS
    this.displayMessage = !this.displayMessage;
  }
}
