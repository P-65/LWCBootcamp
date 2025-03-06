import { LightningElement } from "lwc";

export default class RenderListDemo extends LightningElement {
  superStars = ["Spiderman", "Superman", "Ironman", "Hulk"];

  contactsList = [
    {
      id: "1",
      firstname: "Marc",
      lastname: "Benioff"
    },
    {
      id: "2",
      firstname: "Tim",
      lastname: "Cook"
    },
    {
      id: "3",
      firstname: "Elon",
      lastname: "Musk"
    },
    {
      id: "4",
      firstname: "Bill",
      lastname: "Gates"
    }
  ];
}
