import { LightningElement, api } from "lwc";
import { NavigationMixin } from "lightning/navigation";

export default class HeaderlessQuickActionDemo extends NavigationMixin(
  LightningElement
) {
  @api invoke() {
    // Navigate to the Contact home page
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Contact",
        actionName: "home"
      }
    });
  }
}
