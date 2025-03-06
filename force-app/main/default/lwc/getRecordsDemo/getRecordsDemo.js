import { LightningElement, wire } from "lwc";
import ACCOUNT_NAME from "@salesforce/schema/Account.Name";
import CONTACT_NAME from "@salesforce/schema/Contact.Name";
import { getRecords } from "lightning/uiRecordApi";

export default class GetRecordsDemo extends LightningElement {
  outputs;
  errors;

  @wire(getRecords, {
    records: [
      {
        recordIds: ["0012x00000AAJf4AAH", "0012x000005TKbqAAG"],
        fields: [ACCOUNT_NAME]
      },
      {
        recordIds: ["0032x00000abTqZAAU"],
        fields: [CONTACT_NAME]
      }
    ]
  })
  outputFunction({ data, error }) {
    if (data) {
      console.log("Data", data);
      this.outputs = data;
      this.errors = null;
    } else if (error) {
      console.log("Error", error);
      this.errors = error;
      this.outputs = null;
    }
  }
}
