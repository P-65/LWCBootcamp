import { LightningElement, api } from "lwc";
import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";
import ACCOUNT_INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import ACCOUNT_DATE_FIELD from "@salesforce/schema/Account.SLAExpirationDate__c";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class RecordEditFormDemo extends NavigationMixin(
  LightningElement
) {
  @api recordId;
  @api objectApiName;

  fields = {
    name: ACCOUNT_NAME_FIELD,
    industry: ACCOUNT_INDUSTRY_FIELD,
    slaDate: ACCOUNT_DATE_FIELD
  };

  successHandler(event) {
    let pageRef = {
      type: "standard__recordPage",
      attributes: {
        recordId: event.detail.id,
        objectApiName: this.objectApiName,
        actionName: "view"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
    const successToastEvent = new ShowToastEvent({
      title: "Success",
      message: `${event.detail.name} account created successfully`,
      variant: "success"
    });
    this.dispatchEvent(successToastEvent);
  }

  errorHandler(event) {
    const errorToastEvent = new ShowToastEvent({
      title: "Error",
      message: event.detail.message,
      variant: "error"
    });
    this.dispatchEvent(errorToastEvent);
  }

  submitHandler(event) {
    event.preventDefault();
    console.log(JSON.stringify(event.detail));
    const fields = event.detail.fields;
    if (!fields.Industry) {
      fields.Industry = "Energy";
    }

    this.template.querySelector("lightning-record-edit-form").submit(fields);
  }

  clickHandler() {
    let inputFields = this.template.querySelectorAll("lightning-input-field");
    inputFields.forEach((currItem) => {
      currItem.reset();
    });
  }
}
