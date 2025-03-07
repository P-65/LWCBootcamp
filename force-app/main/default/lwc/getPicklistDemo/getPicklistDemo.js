import {
  getObjectInfo,
  getPicklistValues,
  getPicklistValuesByRecordType
} from "lightning/uiObjectInfoApi";
import { LightningElement, wire } from "lwc";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_INDUSTRY from "@salesforce/schema/Account.Industry";

export default class GetPicklistDemo extends LightningElement {
  value;
  industrypicklistValues;
  @wire(getObjectInfo, {
    objectApiName: ACCOUNT_OBJECT
  })
  accProp;

  @wire(getPicklistValues, {
    recordTypeId: "$accProp.data.defaultRecordTypeId",
    fieldApiName: ACCOUNT_INDUSTRY
  })
  //industrypicklistValues;
  outputFunction({ data, error }) {
    if (data) {
      console.log("Picklist Data", data);
      let updateObject = { label: "", value: "" };
      let updatedArray = data.values.map((currItem) => {
        console.log("currItem.label", currItem.label);
        console.log("currItem.value", currItem.value);
        updateObject = { label: currItem.label, value: currItem.value };
        console.log("updateObject", updateObject);
        return updateObject;
      });
      console.log("updatedArray", updatedArray);
      this.industrypicklistValues = [...updatedArray];
    } else if (error) {
      console.log("Error", error);
    }
  }

  @wire(getPicklistValuesByRecordType, {
    objectApiName: ACCOUNT_OBJECT,
    recordTypeId: "$accProp.data.defaultRecordTypeId"
  })
  accRecPicklistValues;
  // accRecPicklistValues({ data, error }) {
  //   if (data) {
  //     console.log("accRecPicklistValues", data);
  //   } else if (error) {
  //     console.log(" accRecPicklistValues error", error);
  //   }
  // }

  handleChange(event) {
    this.value = event.target.value;
  }
}
