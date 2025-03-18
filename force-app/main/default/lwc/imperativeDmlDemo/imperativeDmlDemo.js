import { getFieldValue, getRecord } from "lightning/uiRecordApi";
import { LightningElement, wire, api } from "lwc";
import ACCOUNT_NAME from "@salesforce/schema/Account.Name";
import ACCOUNT_TICKER from "@salesforce/schema/Account.TickerSymbol";
import updateTicker from "@salesforce/apex/AccountHelper.updateTicker";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { notifyRecordUpdateAvailable } from "lightning/uiRecordApi";

export default class ImperativeDmlDemo extends LightningElement {
  @api recordId;
  accname = "";
  accticker = "";

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [ACCOUNT_NAME, ACCOUNT_TICKER]
  })
  wire_outputFunction({ data, error }) {
    if (data) {
      this.accname = getFieldValue(data, ACCOUNT_NAME);
      this.accticker = getFieldValue(data, ACCOUNT_TICKER);
    } else if (error) {
      console.log("Error in fetching record data", error);
    }
  }

  handleChange(event) {
    this.accticker = event.target.value;
  }

  async clickHandler() {
    // updateTicker({
    //   recordId: this.recordId,
    //   tickerValue: this.accticker
    // })
    //   .then((result) => {
    //     notifyRecordUpdateAvailable([{ recordId: this.recordId }]);
    //     const event = new ShowToastEvent({
    //       title: result,
    //       message: "Account updated successfully",
    //       variant: "success"
    //     });
    //     this.dispatchEvent(event);
    //   })
    //   .catch((error) => {
    //     const event = new ShowToastEvent({
    //       title: "Error",
    //       message: "Account updation Failed" + error.message,
    //       variant: "error"
    //     });
    //     this.dispatchEvent(event);
    //   });
    try {
      await updateTicker({
        recordId: this.recordId,
        tickerValue: this.accticker
      });
      const event = new ShowToastEvent({
        title: "Success",
        message: "Account updated successfully",
        variant: "success"
      });
      this.dispatchEvent(event);
      await notifyRecordUpdateAvailable([{ recordId: this.recordId }]);
    } catch (error) {
      const event = new ShowToastEvent({
        title: "Error",
        message: "Account updation Failed" + error.message,
        variant: "error"
      });
      this.dispatchEvent(event);
    }
  }
}
