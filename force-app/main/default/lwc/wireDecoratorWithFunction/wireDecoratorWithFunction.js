import { LightningElement, wire } from "lwc";
import getAccounts from "@salesforce/apex/AccountHelper.getAccounts";
const columns = [
  { label: "Account Name", fieldName: "Name" },
  { label: "Account Industry", fieldName: "Industry" },
  { label: "Account Rating", fieldName: "Rating" }
];
export default class WireDecoratorWithFunction extends LightningElement {
  accounts;
  errors;
  columns = columns;

  @wire(getAccounts) accountsFunction({ data, error }) {
    if (data) {
      let updatedObject = {};
      let updatedObjectArray = data.map((currItem) => {
        if (!currItem.hasOwnProperty("Rating")) {
          updatedObject = { ...currItem, Rating: "Warm" };
        } else {
          updatedObject = { ...currItem };
        }
        console.log("updatedObject", updatedObject);
        return updatedObject;
      });
      console.log("updatedObjectArray", updatedObjectArray);
      this.accounts = [...updatedObjectArray];
      this.errors = null;
    } else if (error) {
      this.accounts = null;
      this.errors = error;
    }
  }
}
