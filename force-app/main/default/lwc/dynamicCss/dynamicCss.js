import { LightningElement } from "lwc";

export default class DynamicCss extends LightningElement {
  pColor = "chocolate-color";

  addCssHandler() {
    let element = this.template.querySelector("p");
    element.classList.add("green-border");
  }
  removeCssHandler() {
    let element = this.template.querySelector("p");
    element.classList.remove("green-border");
  }
  toggleCssHandler() {
    let element = this.template.querySelector("p");
    element.classList.toggle("green-border");
  }
}
