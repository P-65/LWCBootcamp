import { LightningElement, wire } from "lwc";
import getAccounts from "@salesforce/apex/AccountHelper.getAccounts";
const columns = [
  { label: "Account Name", fieldName: "Name" },
  { label: "Account Industry", fieldName: "Industry" },
  { label: "Account Rating", fieldName: "Rating" }
];

export default class WireDecoratorProperty extends LightningElement {
  columns = columns;

  @wire(getAccounts) accounts;

  //accounts.data
  //accounts.error
}
