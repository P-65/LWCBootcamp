import { LightningElement, wire } from "lwc";
import LOGO from "@salesforce/resourceUrl/MyLogo";
import MYLOGO from "@salesforce/contentAssetUrl/MyAssetLogo";
import GREETING from "@salesforce/label/c.greeting";
import SALESFORCE_PLATFORM from "@salesforce/label/c.SalesforcePlatform";
import USER_ID from "@salesforce/user/Id";
import { getFieldValue, getRecord } from "lightning/uiRecordApi";
import USER_NAME from "@salesforce/schema/User.Name";
import DISPLAY_TEXT from "@salesforce/customPermission/displayText";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";
import ANIMATE from "@salesforce/resourceUrl/ThirdPartyCss";
import MOMENT from "@salesforce/resourceUrl/ThirdPartyJs";

export default class StaticResourcesLogoDemo extends LightningElement {
  myLogo = LOGO;
  name = "";
  myassetImage = MYLOGO;
  label = {
    greeting: GREETING,
    salesforceplatform: SALESFORCE_PLATFORM
  };
  isFirstLoad = true;
  displayDate = "";

  @wire(getRecord, {
    recordId: USER_ID,
    fields: [USER_NAME]
  })
  wired_user_output({ data, error }) {
    if (data) {
      this.name = getFieldValue(data, USER_NAME);
    } else if (error) {
      console.log("Error in fetching user details", error);
    }
  }

  renderedCallback() {
    if (this.isFirstLoad) {
      //   loadStyle(this, ANIMATE)
      //     .then(() => {
      //       console.log("Files loaded successfully");
      //       this.isFirstLoad = false;
      //     })
      //     .catch((error) => {
      //       console.log("Error in loading files", error);
      //     });
      Promise.all([loadStyle(this, ANIMATE), loadScript(this, MOMENT)])
        .then(() => {
          console.log("Files loaded successfully");
          this.isFirstLoad = false;
          this.displayDateInCustomFormat();
        })
        .catch((error) => {
          console.log("Error in loading files", error);
        });
    }
  }

  get checkPermission() {
    return DISPLAY_TEXT;
  }

  displayDateInCustomFormat() {
    this.displayDate = moment().format("LLLL");
  }
}
