import { LightningElement, api } from "lwc";
import ACCOUNT_NAME from "@salesforce/schema/Account.Name";
import ACCOUNT_INDUSTRY from "@salesforce/schema/Account.Industry";
import { CloseActionScreenEvent } from "lightning/actions";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class ScreenQuickActionDemo extends LightningElement {
  @api recordId;
  @api objectApiName;
  fields = {
    accountName: ACCOUNT_NAME,
    accountIndustry: ACCOUNT_INDUSTRY
  };

  closeModal() {
    this.dispatchEvent(new CloseActionScreenEvent());
  }

  handleSuccess() {
    this.dispatchEvent(new CloseActionScreenEvent());
    this.dispatchEvent(
      new ShowToastEvent({
        title: "Success",
        message: "Record updated Successfully",
        variant: "success"
      })
    );
  }
}
