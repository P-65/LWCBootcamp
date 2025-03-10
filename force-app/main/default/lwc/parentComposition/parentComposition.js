import { LightningElement } from "lwc";

export default class ParentComposition extends LightningElement {
  fireChildHandler() {
    console.log("Event handled in parent child level");
  }

  fireChildDivHandler() {
    console.log("Event handled in parent Div level");
  }
}
