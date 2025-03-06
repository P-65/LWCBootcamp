import { LightningElement, track } from "lwc";

export default class NestedObjectPrivateProperty extends LightningElement {
  @track myDetails = { fname: "Puneeth", lname: "Murugesh" };
  @track myTask = ["Office", "Meeting", "Bootcamp"];
  handleClick(event) {
    this.myDetails.fname = "Padmavathi";
  }

  addTaskHandler(event) {
    this.myTask.push("Self Study");
  }

  refreshHandler() {
    this.myDetails = { fname: "Padmavathi", lname: "Murugesh" }; //track is not needed here.
    this.myTask = [...this.myTask, "Self Study"]; //track is not needed here.
  }
}
