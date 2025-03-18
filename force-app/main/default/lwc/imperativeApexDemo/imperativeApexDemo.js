import { LightningElement, wire } from "lwc";
import getAccounts from "@salesforce/apex/AccountHelper.getAccounts";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_INDUSTRY from "@salesforce/schema/Account.Industry";

export default class ImperativeApexDemo extends LightningElement {
  accounts = [];
  columns = [
    { label: "Account Name", fieldName: "Name" },
    { label: "Account Industry", fieldName: "Industry" },
    { label: "Account Rating", fieldName: "Rating" }
  ];
  selIndustry = "";

  @wire(getObjectInfo, {
    objectApiName: ACCOUNT_OBJECT
  })
  accountInfo;

  @wire(getPicklistValues, {
    recordTypeId: "$accountInfo.data.defaultRecordTypeId",
    fieldApiName: ACCOUNT_INDUSTRY
  })
  industryPicklist;

  handleChange(event) {
    this.selIndustry = event.target.value;
  }

  clickHandler() {
    getAccounts({ industryInput: this.selIndustry })
      .then((result) => {
        console.log("Accounts Fetched Successfully");
        this.accounts = result;
      })
      .catch((error) => {
        console.log("Error in fetching Accounts", error);
      });
  }

  get displayButton() {
    return this.selIndustry === "" ? true : false;
  }
}
