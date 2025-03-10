import { LightningElement } from "lwc";

export default class GrandParentComposition extends LightningElement {
  fireChildHandler() {
    console.log("Event handled in grand parent child level");
  }
}
