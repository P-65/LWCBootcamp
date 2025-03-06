import { LightningElement, api } from "lwc";

export default class ChildLwcBootcampComponent extends LightningElement {
  @api display;
  @api displayGreeting;
  //@api user;
  displayUser;
  @api isUserAvailable = false;

  set user(value) {
    let cloneUser = { ...value };
    this.displayUser = cloneUser.channel.toUpperCase();
  }

  @api
  get user() {
    return this.displayUser;
  }
}
