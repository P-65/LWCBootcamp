import { LightningElement } from "lwc";

export default class FullNameGenerator extends LightningElement {
  fname = "";
  lname = "";
  fullName = "";

  changeHandler(event) {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "name1") {
      this.fname = value;
    } else if (name === "name2") {
      this.lname = value;
    }
  }

  handleClick() {
    let fullNameLowerCase = this.fname + " " + this.lname;
    this.fullName = fullNameLowerCase.toUpperCase();
  }
}
