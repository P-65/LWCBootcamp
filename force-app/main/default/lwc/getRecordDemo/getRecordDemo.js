import { LightningElement, wire, api } from "lwc";
import ACCOUNT_NAME from "@salesforce/schema/Account.Name";
import ACCOUNT_REVENUE from "@salesforce/schema/Account.AnnualRevenue";
import {
  getFieldDisplayValue,
  getFieldValue,
  getRecord
} from "lightning/uiRecordApi";

export default class GetRecordDemo extends LightningElement {
  @api recordId;
  accName;
  accRevenue;

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [ACCOUNT_NAME, ACCOUNT_REVENUE]
  })
  outputFunction({ data, error }) {
    if (data) {
      console.log("Data", data);
      //this.accName = data.fields.Name.value;
      //this.accRevenue = data.fields.AnnualRevenue.value;
      //   this.accName = getFieldValue(data, ACCOUNT_NAME);
      //   this.accRevenue = getFieldValue(data, ACCOUNT_REVENUE);
      this.accName = getFieldValue(data, ACCOUNT_NAME); // we don't have display value
      this.accRevenue = getFieldDisplayValue(data, ACCOUNT_REVENUE); //we have display value
    } else if (error) {
      console.log("Error", error);
    }
  }
}
