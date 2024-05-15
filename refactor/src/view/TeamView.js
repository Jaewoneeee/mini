import { Observer } from "./Observer.js";

export class TeamView extends Observer {
    constructor(containerId, detailsContainerId) {
        super();
        this.teamContainer = document.getElementById(containerId);
        this.detailsContainer = document.getElementById(detailsContainerId);
        this.teamListElement = this.initializeUI();
        this.initializeDetails();
    }

    initializeUI() {
        console.log("최초 한번만 실행? Team");
        this.ul = document.createElement("ul");
        this.teamContainer.appendChild(this.ul);

        this.teamListElement = this.teamContainer.querySelector("ul");
        return this.teamListElement;
    }

    initializeDetails() {
        console.log("최초 한번만 실행? Detail");
        this.namePara = document.createElement("p");
        this.deptPara = document.createElement("p");
        this.agePara = document.createElement("p");
        this.detailsContainer.appendChild(this.namePara);
        this.detailsContainer.appendChild(this.deptPara);
        this.detailsContainer.appendChild(this.agePara);
    }

    update(teams) {
        console.log("6. return해준 team을 매소드로 view에서 update");
        this.renderTeams(teams);
        this.update2();
    }

    renderTeams(teams) {
        // Ensure that we only append new teams not already rendered
        const renderedTeams = new Set(
            [...this.teamListElement.querySelectorAll("li")].map((li) =>
                li.getAttribute("id")
            )
        );
        teams.forEach((team) => {
            if (!renderedTeams.has(`team-${team.name}`)) {
                const teamElement = this.createTeamElement(team);
                this.teamListElement.appendChild(teamElement);
            }
        });

        // teams.forEach((team) => {
        //     const teamElement = this.createTeamElement(team);
        //     this.teamListElement.appendChild(teamElement);
        // });
    }

    createTeamElement(team) {
        console.log("마지막 작업 : 팀단위로 랜더링함");
        const li = document.createElement("li");
        li.id = `team-${team.name}`;
        const details = document.createElement("details");
        const summary = document.createElement("summary");
        summary.textContent = team.name;
        const membersList = document.createElement("ul");

        team.members.forEach((member) => {
            const memberLi = document.createElement("li");
            memberLi.textContent = member.name;
            memberLi.onclick = () => this.displayMemberDetails(member);
            membersList.appendChild(memberLi);
        });

        details.appendChild(summary);
        details.appendChild(membersList);
        li.appendChild(details);
        return li;
    }

    displayMemberDetails(member) {
        console.log("클릭 누적?");
        this.namePara.textContent = `Name: ${member.name}`;
        this.deptPara.textContent = `Department: ${member.department}`;
        this.agePara.textContent = `Age: ${member.age}`;
    }
}
