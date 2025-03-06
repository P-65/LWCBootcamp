import { LightningElement } from "lwc";

export default class CalculatorBootcampComponent extends LightningElement {
  numberone = "";
  numbertwo = "";
  result = 0;
  displayOutput = false;

  //   handleChangeNumberOne(event) {
  //     this.numberone = event.target.value;
  //   }
  //   handleChangeNumberTwo(event) {
  //     this.numbertwo = event.target.value;
  //   }

  handleChange(event) {
    // let name = event.target.name;
    // let value = event.target.value;
    let { name, value } = event.target;

    if (name === "number1") {
      this.numberone = value;
    } else if (name === "number2") {
      this.numbertwo = value;
    }
  }

  calculateInputs(event) {
    this.displayOutput = true;
    let labelElement = event.target.label;

    if (labelElement === "Add") {
      this.result = parseInt(this.numberone) + parseInt(this.numbertwo);
    } else if (labelElement === "Sub") {
      this.result = parseInt(this.numberone) - parseInt(this.numbertwo);
    } else if (labelElement === "Mul") {
      this.result = parseInt(this.numberone) * parseInt(this.numbertwo);
    } else if (labelElement === "Div") {
      this.result = parseInt(this.numberone) / parseInt(this.numbertwo);
    }

    //reset inputs
    this.numberone = "";
    this.numbertwo = "";
  }

  /*addHandler() {
    this.result = parseInt(this.numberone) + parseInt(this.numbertwo);
  }
  subHandler() {
    this.result = parseInt(this.numberone) - parseInt(this.numbertwo);
  }
  mulHandler() {
    this.result = parseInt(this.numberone) * parseInt(this.numbertwo);
  }
  divHandler() {
    this.result = parseInt(this.numberone) / parseInt(this.numbertwo);
  }*/
}
