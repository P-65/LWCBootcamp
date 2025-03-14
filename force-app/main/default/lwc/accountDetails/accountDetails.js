import { LightningElement, wire, api } from "lwc";
import getParentAccounts from "@salesforce/apex/AccountHelper.getParentAccounts";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_ID from "@salesforce/schema/Account.Id";
import ACCOUNT_PARENT from "@salesforce/schema/Account.ParentId";
import ACCOUNT_NAME from "@salesforce/schema/Account.Name";
import ACCOUNT_SLA_EXPIRATION from "@salesforce/schema/Account.SLAExpirationDate__c";
import ACCOUNT_SLA_TYPE from "@salesforce/schema/Account.SLA__c";
import ACCOUNT_NO_OF_LOCATIONS from "@salesforce/schema/Account.Number_of_Locations__c";
import ACCOUNT_DESCRIPTION from "@salesforce/schema/Account.Description";
import {
  createRecord,
  deleteRecord,
  getFieldValue,
  getRecord,
  updateRecord
} from "lightning/uiRecordApi";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

const fieldsToLoad = [
  ACCOUNT_PARENT,
  ACCOUNT_NAME,
  ACCOUNT_SLA_EXPIRATION,
  ACCOUNT_SLA_TYPE,
  ACCOUNT_NO_OF_LOCATIONS,
  ACCOUNT_DESCRIPTION
];
export default class AccountDetails extends NavigationMixin(LightningElement) {
  parentAccounts = [];
  selParentAcc = "";
  selAccountName = "";
  selSlaDate = null;
  selSlaType = "";
  selNoOfLoc = "1";
  selDescription = "";
  @api recordId;

  @wire(getRecord, {
    recordId: "$recordId",
    fields: fieldsToLoad
  })
  wired_getRecordFunction({ data, error }) {
    if (data) {
      this.selParentAcc = getFieldValue(data, ACCOUNT_PARENT);
      this.selAccountName = getFieldValue(data, ACCOUNT_NAME);
      this.selSlaDate = getFieldValue(data, ACCOUNT_SLA_EXPIRATION);
      this.selSlaType = getFieldValue(data, ACCOUNT_SLA_TYPE);
      this.selNoOfLoc = getFieldValue(data, ACCOUNT_NO_OF_LOCATIONS);
      this.selDescription = getFieldValue(data, ACCOUNT_DESCRIPTION);
    } else if (error) {
      console.log("Error while getting record", error);
    }
  }

  @wire(getParentAccounts) wired_parentAccountsFunction({ data, error }) {
    if (data) {
      console.log("Parent Accounts", data);
      this.parentAccounts = data.map((currItem) => ({
        label: currItem.Name,
        value: currItem.Id
      }));
      console.log("this.parentAccounts", this.parentAccounts);
    } else if (error) {
      console.log("Error while getting parent accounts", error);
    }
  }

  @wire(getObjectInfo, {
    objectApiName: ACCOUNT_OBJECT
  })
  accountObjInfo;

  @wire(getPicklistValues, {
    recordTypeId: "$accountObjInfo.data.defaultRecordTypeId",
    fieldApiName: ACCOUNT_SLA_TYPE
  })
  slaPicklist;

  handleChange(event) {
    let { name, value } = event.target;
    if (name === "parentAcc") {
      this.selParentAcc = value;
    }
    if (name === "accName") {
      this.selAccountName = value;
    }
    if (name === "slaDte") {
      this.selSlaDate = value;
    }
    if (name === "slaType") {
      this.selSlaType = value;
    }
    if (name === "noofLoc") {
      this.selNoOfLoc = value;
    }
    if (name === "description") {
      this.selDescription = value;
    }
  }

  saveHandler() {
    console.log("Inside Save Handler");
    if (this.validateInput()) {
      console.log("Inside Save Handler");
      let inputfields = {};
      inputfields[ACCOUNT_PARENT.fieldApiName] = this.selParentAcc;
      inputfields[ACCOUNT_NAME.fieldApiName] = this.selAccountName;
      inputfields[ACCOUNT_SLA_EXPIRATION.fieldApiName] = this.selSlaDate;
      inputfields[ACCOUNT_SLA_TYPE.fieldApiName] = this.selSlaType;
      inputfields[ACCOUNT_NO_OF_LOCATIONS.fieldApiName] = this.selNoOfLoc;
      inputfields[ACCOUNT_DESCRIPTION.fieldApiName] = this.selDescription;

      if (this.recordId) {
        inputfields[ACCOUNT_ID.fieldApiName] = this.recordId;
        let recordInput = {
          fields: inputfields
        };
        updateRecord(recordInput)
          .then((result) => {
            console.log("Account Updated Successfully", result);
            const event = new ShowToastEvent({
              title: "Success",
              message: `Account '${result.fields.Name.value}' saved successfully`,
              variant: "success"
            });
            this.dispatchEvent(event);
          })
          .catch((error) => {
            console.log("Error while updating the account", error);
          });
      } else {
        let recordInput = {
          apiName: ACCOUNT_OBJECT.objectApiName,
          fields: inputfields
        };

        createRecord(recordInput)
          .then((result) => {
            console.log("Account Created Successfully", result);
            let pageRef = {
              type: "standard__recordPage",
              attributes: {
                recordId: result.id,
                objectApiName: ACCOUNT_OBJECT,
                actionName: "view"
              }
            };
            this[NavigationMixin.Navigate](pageRef);

            this.dispatchEvent(
              new ShowToastEvent({
                title: "Success",
                variant: "success",
                message: `${result.fields.Name.value} account created successfully`
              })
            );
          })
          .catch((error) => {
            console.log("Error in creation", error);
          });
      }
    } else {
      console.log("Inputs are not valid");
    }
  }

  validateInput() {
    let inputFields = Array.from(this.template.querySelectorAll(".inputs"));
    let isValid = inputFields.every((currItem) => currItem.checkValidity());
    console.log("isValid", isValid);
    return isValid;
  }

  deleteHandler() {
    deleteRecord(this.recordId)
      .then(() => {
        this.navigateToListView();
      })
      .catch((error) => {
        console.log("Error while deleting account", error);
      });
  }

  navigateToListView() {
    let pageRef = {
      type: "standard__objectPage",
      attributes: {
        objectApiName: ACCOUNT_OBJECT,
        actionName: "list"
      },
      state: {
        filterName: "Recent"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
    this.dispatchEvent(
      new ShowToastEvent({
        title: "Success",
        variant: "success",
        message: "Account Deleted Successfully"
      })
    );
  }

  get fetchTitle() {
    if (this.recordId) {
      return "Edit Account";
    } else {
      return "Create Account";
    }
  }

  get isDeleteAvailable() {
    if (this.recordId) {
      return true;
    } else {
      return false;
    }
  }
}
