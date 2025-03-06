import { getObjectInfo } from "lightning/uiObjectInfoApi";
import { LightningElement, wire } from "lwc";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";

export default class GetObjectInfoDemo extends LightningElement {
  accObjInfo;
  errors;

  @wire(getObjectInfo, {
    objectApiName: ACCOUNT_OBJECT
  })
  outputFunction({ data, error }) {
    if (data) {
      console.log("Data", data);
      this.accObjInfo = data;
      this.errors = null;
    } else if (error) {
      console.log("Error", error);
      this.accObjInfo = null;
      this.errors = error;
    }
  }
}
