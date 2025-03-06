import { LightningElement, wire, api } from "lwc";
import getRecords from "@salesforce/apex/CustomLookupApexController.getRecords";
const DELAY = 300;
export default class CustomLookup extends LightningElement {
  @api apiName = "Account";
  searchValue;
  @api objectLabel = "Account";
  @api iconName;
  delayTimeOut;
  selectedRecord = {
    selectedId: "",
    selectedName: ""
  };
  displayOptions = false;

  @wire(getRecords, {
    objectApiName: "$apiName",
    searchKey: "$searchValue"
  })
  outputs;

  get isRecordSelected() {
    return this.selectedRecord.selectedId === "" ? false : true;
  }

  changeHandler(event) {
    window.clearTimeout(this.delayTimeOut);
    let enteredValue = event.target.value;
    //debouncing - do not update reactive property as long as this function is
    //being called within a delay of DELAY

    let delayTimeOut = setTimeout(() => {
      this.searchValue = enteredValue;
      this.displayOptions = true;
    }, DELAY);
  }

  clickHandler(event) {
    let selectedId = event.currentTarget.dataset.item;
    console.log("selectedId", selectedId);
    let outputRecord = this.outputs.data.find(
      (currItem) => currItem.Id === selectedId
    );
    console.log("outputRecord", outputRecord);
    this.selectedRecord = {
      selectedId: outputRecord.Id,
      selectedName: outputRecord.Name
    };
    console.log("this.selectedRecord", this.selectedRecord);
    this.displayOptions = false;
  }

  removalSelectionHandler() {
    this.selectedRecord = {
      selectedId: "",
      selectedName: ""
    };
    this.displayOptions = false;
  }
}
