import { LightningElement, wire } from "lwc";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
import { NavigationMixin } from "lightning/navigation";

export default class ContactFilter extends NavigationMixin(LightningElement) {
  selectedRecordId = "";
  selectedIndustry = "";
  isButtonDisabled = true;

  @wire(getObjectInfo, {
    objectApiName: ACCOUNT_OBJECT
  })
  accountObjInfo;

  @wire(getPicklistValues, {
    recordTypeId: "$accountObjInfo.data.defaultRecordTypeId",
    fieldApiName: ACCOUNT_INDUSTRY_FIELD
  })
  industryPicklistValues;

  selectedRecordIdHandler(event) {
    this.selectedRecordId = event.detail;
    console.log("selectedRecordId", this.selectedRecordId);
    if (this.selectedRecordId) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
    this.sendFilterChange();
  }

  handleChange(event) {
    this.selectedIndustry = event.target.value;
    console.log("selectedIndustry", this.selectedIndustry);
    this.sendFilterChange();
  }

  clickHandler() {
    let defaultValues = encodeDefaultFieldValues({
      AccountId: this.selectedRecordId
    });

    let pageRef = {
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Contact",
        actionName: "new"
      },
      state: {
        defaultFieldValues: defaultValues
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }

  sendFilterChange() {
    let filterChangeEvent = new CustomEvent("filterchange", {
      detail: {
        accountId: this.selectedRecordId,
        industry: this.selectedIndustry
      }
    });
    this.dispatchEvent(filterChangeEvent);
  }
}
