import { LightningElement, wire } from "lwc";
import getContactsList from "@salesforce/apex/contactsFilterController.getContactsList";

export default class ContactBrowser extends LightningElement {
  selectedAccountId = "";
  selectedIndustry = "";

  @wire(getContactsList, {
    accountId: "$selectedAccountId",
    industry: "$selectedIndustry"
  })
  contactsFunction({ data, error }) {
    if (data) {
      console.log("Contacts data", data);
    } else if (error) {
      console.log("Contacts error", error);
    }
  }
  handleFilterChange(event) {
    this.selectedAccountId = event.detail.accountId;
    this.selectedIndustry = event.detail.industry;
  }
}
