import { LightningElement } from "lwc";

export default class ChildHook extends LightningElement {
  constructor() {
    super();
    console.log("Constructor from Child");
  }

  connectedCallback() {
    console.log("ConnectedCallback from Child");
    throw new Error("Error while loading child");
  }

  renderedCallback() {
    console.log("renderedCallback from Child");
  }

  errorCallback(error, stack) {
    console.log("errorCallback from Child");
  }

  disconnectedCallback() {
    console.log("disconnectedCallback from Child");
  }
}
