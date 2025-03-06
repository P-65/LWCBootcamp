import { LightningElement } from "lwc";

export default class ToDoApplication extends LightningElement {
  taskName = "";
  taskDate = null;
  incompleteTasks = [];
  completedTasks = [];

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
      this.incompleteTasks = [
        ...this.incompleteTasks,
        {
          taskname: this.taskName,
          taskdate: this.taskDate
        }
      ];
      this.resetHandler();
      let sortedArray = this.sortTask(this.incompleteTasks);
      this.incompleteTasks = [...sortedArray];
      console.log("this.incompleteTasks", this.incompleteTasks);
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
    let index = event.target.name;
    this.incompleteTasks.splice(index, 1);
    let sortedArray = this.sortTask(this.incompleteTasks);
    this.incompleteTasks = [...sortedArray];
    console.log("this.incompleteTasks", this.incompleteTasks);
  }
  addToCompleteTaskHandler(event) {
    let index = event.target.name;
    this.refreshData(index);
  }

  dragStartHandler(event) {
    event.dataTransfer.setData("index", event.dataset.item);
  }

  allowDrop(event) {
    event.preventDefault();
  }

  dropElementHandler(event) {
    let index = event.dataTransfer.getData("index");
    this.refreshData(index);
  }

  refreshData(index) {
    //Remove task item from incompletetask array
    let removeItem = this.incompleteTasks.splice(index, 1); //returns removed item array
    let sortedArray = this.sortTask(this.incompleteTasks);
    this.incompleteTasks = [...sortedArray];
    console.log("this.incompleteTasks", this.incompleteTasks);
    //Add the same entry in completedtask array
    this.completedTasks = [...this.completedTasks, removeItem[0]];
  }
}
