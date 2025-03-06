import { LightningElement, api } from "lwc";

export default class DynamicRecordAndObject extends LightningElement {
  @api recordId;
  @api objectApiName;
}
