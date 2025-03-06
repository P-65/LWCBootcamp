import { LightningElement, track } from "lwc";

export default class WelcomeTechJourneyWithPuneeth extends LightningElement {
  greeting = "Hello";
  @track welcome = "Tech Journey With Puneeth";

  handleClick(event) {
    this.greeting = "Namaste";
    this.welcome = "Today is Day 19 of LWC Bootcamp";
  }
}
