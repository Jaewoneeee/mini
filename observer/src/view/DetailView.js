import { Observer } from "./Observer.js";

export class DetailsView extends Observer {
    constructor(detailsContainerId) {
        super();
        this.detailsContainer = document.getElementById(detailsContainerId);
        this.initializeDetails();
    }

    initializeDetails() {
        this.namePara = document.createElement("p");
        this.deptPara = document.createElement("p");
        this.agePara = document.createElement("p");
        this.detailsContainer.appendChild(this.namePara);
        this.detailsContainer.appendChild(this.deptPara);
        this.detailsContainer.appendChild(this.agePara);
    }

    update(member) {
        this.displayMemberDetails(member);
        this.observerUpdate();
    }

    displayMemberDetails(member) {
        this.namePara.textContent = `Name: ${member.name}`;
        this.deptPara.textContent = `Department: ${member.department}`;
        this.agePara.textContent = `Age: ${member.age}`;
    }
}
