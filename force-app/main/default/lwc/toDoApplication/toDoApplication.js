import {
  createRecord,
  deleteRecord,
  updateRecord
} from "lightning/uiRecordApi";
import { LightningElement, wire } from "lwc";
import TASK_OBJECT from "@salesforce/schema/Task_Manager__c";
import TASK_ID_FIELD from "@salesforce/schema/Task_Manager__c.Id";
import TASK_NAME_FIELD from "@salesforce/schema/Task_Manager__c.Name";
import TASK_DATE_FIELD from "@salesforce/schema/Task_Manager__c.Task_Date__c";
import TASK_COMPLETED_DATE_FIELD from "@salesforce/schema/Task_Manager__c.Completed_Date__c";
import TASK_IS_COMPLETED_FIELD from "@salesforce/schema/Task_Manager__c.Is_Completed__c";
import loadAllIncompleteTasks from "@salesforce/apex/ToDoManagerAppController.loadAllIncompleteTasks";
import loadAllCompleteTasks from "@salesforce/apex/ToDoManagerAppController.loadAllCompleteTasks";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";
export default class ToDoApplication extends LightningElement {
  taskName = "";
  taskDate = null;
  incompleteTasks = [];
  completedTasks = [];
  incompleteTasksResult;
  completeTasksResult;

  @wire(loadAllIncompleteTasks) wired_incompleteTasks(result) {
    this.incompleteTasksResult = result;
    let { data, error } = result;
    if (data) {
      this.incompleteTasks = data.map((currItem) => ({
        taskId: currItem.Id,
        taskname: currItem.Name,
        taskdate: currItem.Task_Date__c
      }));
    } else if (error) {
      console.log("Failed to get incomplete tasks", error);
    }
  }

  @wire(loadAllCompleteTasks) wired_completeTasks(result) {
    this.completeTasksResult = result;
    let { data, error } = result;
    if (data) {
      this.completedTasks = data.map((currItem) => ({
        taskId: currItem.Id,
        taskname: currItem.Name,
        taskdate: currItem.Completed_Date__c
      }));
    } else if (error) {
      console.log("Failed to get completed tasks", error);
    }
  }

  changeHandler(event) {
    let { name, value } = event.target;
    if (name === "taskname") {
      this.taskName = value;
    } else if (name === "taskdate") {
      this.taskDate = value;
    }
  }

  resetHandler() {
    this.taskName = "";
    this.taskDate = null;
  }

  addTaskHandler() {
    if (!this.taskDate) {
      this.taskDate = new Date().toISOString().slice(0, 10);
    }
    if (this.validateAddTask()) {
      // this.incompleteTasks = [
      //   ...this.incompleteTasks,
      //   {
      //     taskname: this.taskName,
      //     taskdate: this.taskDate
      //   }
      // ];
      // this.resetHandler();
      // let sortedArray = this.sortTask(this.incompleteTasks);
      // this.incompleteTasks = [...sortedArray];
      // console.log("this.incompleteTasks", this.incompleteTasks);
      let inputFields = {};
      inputFields[TASK_NAME_FIELD.fieldApiName] = this.taskName;
      inputFields[TASK_DATE_FIELD.fieldApiName] = this.taskDate;
      inputFields[TASK_IS_COMPLETED_FIELD.fieldApiName] = false;

      let recordInput = {
        apiName: TASK_OBJECT.objectApiName,
        fields: inputFields
      };
      createRecord(recordInput)
        .then((result) => {
          console.log("Task Created Successfully", result);
          refreshApex(this.incompleteTasksResult);
          this.resetHandler();
          this.showToast("Success", "Task Created Successfully", "success");
        })
        .catch((error) => {
          console.log("Task Creation Failed", error);
          this.showToast("Error", "Task Creation Failed", "error");
        });
    }
  }

  validateAddTask() {
    let isValid = true;
    let element = this.template.querySelector(".taskname");
    let taskItem = this.incompleteTasks.find(
      (currItem) =>
        currItem.taskname === this.taskName &&
        currItem.taskdate === this.taskDate
    );

    if (taskItem) {
      isValid = false;
      element.setCustomValidity("Task is already available");
    }
    if (isValid) {
      element.setCustomValidity("");
    }
    element.reportValidity(); //to show error on UI
    return isValid;
  }

  sortTask(inputArray) {
    let sortedArray = inputArray.sort((a, b) => {
      let dateA = new Date(a.taskdate);
      let dateB = new Date(b.taskdate);
      return dateA - dateB;
    });
    return sortedArray;
  }

  removalHandler(event) {
    let recordId = event.target.name;
    // this.incompleteTasks.splice(index, 1);
    // let sortedArray = this.sortTask(this.incompleteTasks);
    // this.incompleteTasks = [...sortedArray];
    // console.log("this.incompleteTasks", this.incompleteTasks);
    deleteRecord(recordId)
      .then(() => {
        console.log("Task Deleted Successfully");
        refreshApex(this.incompleteTasksResult);
        this.showToast("Deleted", "Task Deleted Successfully", "success");
      })
      .catch((error) => {
        console.log("Task Deletion Failed", error);
        this.showToast("Error", "Task Deletion Failed", "error");
      });
  }
  addToCompleteTaskHandler(event) {
    let recordId = event.target.name;
    this.refreshData(recordId);
  }

  dragStartHandler(event) {
    event.dataTransfer.setData("index", event.dataset.item);
  }

  allowDrop(event) {
    event.preventDefault();
  }

  dropElementHandler(event) {
    let recordId = event.dataTransfer.getData("index");
    this.refreshData(recordId);
  }

  async refreshData(recordId) {
    // //Remove task item from incompletetask array
    // let removeItem = this.incompleteTasks.splice(index, 1); //returns removed item array
    // let sortedArray = this.sortTask(this.incompleteTasks);
    // this.incompleteTasks = [...sortedArray];
    // console.log("this.incompleteTasks", this.incompleteTasks);
    // //Add the same entry in completedtask array
    // this.completedTasks = [...this.completedTasks, removeItem[0]];
    let inputFields = {};
    inputFields[TASK_ID_FIELD.fieldApiName] = recordId;
    inputFields[TASK_IS_COMPLETED_FIELD.fieldApiName] = true;
    inputFields[TASK_COMPLETED_DATE_FIELD.fieldApiName] = new Date()
      .toISOString()
      .slice(0, 10);

    let recordInput = {
      fields: inputFields
    };
    try {
      await updateRecord(recordInput);
      await refreshApex(this.incompleteTasksResult);
      await refreshApex(this.completeTasksResult);
      this.showToast("Success", "Task Completed Successfully", "success");
    } catch (error) {
      console.log("Update operation failed", error);
      this.showToast("Error", "Complete Task operation failed", "error");
    }
  }

  showToast(title, message, variant) {
    const event = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(event);
  }
}
