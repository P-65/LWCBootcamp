import { LightningElement, wire } from "lwc";
import getContactsListForDataTable from "@salesforce/apex/ContactController.getContactsListForDataTable";
const columns = [
  {
    label: "Name",
    type: "customName",
    typeAttributes: {
      contactName: {
        fieldName: "Name"
      }
    }
  },
  {
    label: "Account Name",
    fieldName: "accountLink",
    type: "url",
    typeAttributes: {
      label: {
        fieldName: "accountName"
      },
      target: "_blank"
    }
  },
  {
    label: "Title",
    fieldName: "Title",
    cellAttributes: {
      class: {
        fieldName: "titleColor"
      }
    }
  },
  {
    label: "Rank",
    fieldName: "Rank__c",
    type: "customRank",
    typeAttributes: {
      rankIcon: {
        fieldName: "rank"
      }
    }
  },
  { label: "Phone", fieldName: "Phone", type: "phone" },
  { label: "Email", fieldName: "Email", type: "email" },
  {
    label: "Picture",
    type: "customPicture",
    typeAttributes: {
      pictureUrl: {
        fieldName: "Picture__c"
      }
    },
    cellAttributes: {
      alignment: "center"
    }
  }
];

export default class CustomStyleDataTable extends LightningElement {
  contacts;
  columns = columns;
  @wire(getContactsListForDataTable) wiredcontacts({ data, error }) {
    if (data) {
      //this.contacts = data;
      this.contacts = data.map((record) => {
        let accountLink = "/" + record.AccountId;
        let accountName = record.Account.Name;
        let titleColor = "slds-text-color_success";
        let rank = record.Rank__c > 5 ? "utility:ribbon" : "";
        return {
          ...record,
          accountLink: accountLink,
          accountName: accountName,
          titleColor: titleColor,
          rank: rank
        };
      });
      console.log(data);
    } else {
      console.log(error);
    }
  }
}
