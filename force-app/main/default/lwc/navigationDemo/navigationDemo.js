import { LightningElement } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";

export default class NavigationDemo extends NavigationMixin(LightningElement) {
  navHomeClickHandler() {
    let pageRef = {
      type: "standard__namedPage",
      attributes: {
        pageName: "home"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }

  navAccListViewClickHandler() {
    let pageRef =
      // Navigates to account list with the filter set to Recent.
      {
        type: "standard__objectPage",
        attributes: {
          objectApiName: "Account",
          actionName: "list"
        },
        state: {
          filterName: "PlatinumandGoldSLACustomers"
        }
      };
    this[NavigationMixin.Navigate](pageRef);
  }

  navCreateAccClickHandler() {
    let pageRef = {
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Account",
        actionName: "new"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }

  navCreateAccDefaultClickHandler() {
    const defaultValues = encodeDefaultFieldValues({
      Rating: "Hot",
      Industry: "Energy"
    });
    let pageRef = {
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Account",
        actionName: "new"
      },
      state: {
        defaultFieldValues: defaultValues
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }

  editAccClickHandler() {
    let pageRef = {
      type: "standard__recordPage",
      attributes: {
        recordId: "001Ih0000089qjWIAQ",
        objectApiName: "Account",
        actionName: "edit"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }
}
