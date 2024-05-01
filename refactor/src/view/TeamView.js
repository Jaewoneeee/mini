import { Observer } from "./Observer.js";

export class TeamView extends Observer {
    constructor(containerId, detailsContainerId) {
        super();
        this.teamContainer = document.getElementById(containerId);
        this.detailsContainer = document.getElementById(detailsContainerId);
        this.initializeUI();
        this.initializeDetails();
    }

    initializeUI() {
        this.teamContainer.innerHTML = ""; // 초기 팀 리스트를 설정합니다.
        const ul = document.createElement("ul");
        ul.className = "tree";
        this.teamContainer.appendChild(ul);
        this.teamListElement = ul;
    }

    // 세부 정보용 DOM 요소를 초기화합니다.
    initializeDetails() {
        this.namePara = document.createElement("p");
        this.deptPara = document.createElement("p");
        this.agePara = document.createElement("p");
        this.detailsContainer.appendChild(this.namePara);
        this.detailsContainer.appendChild(this.deptPara);
        this.detailsContainer.appendChild(this.agePara);
    }

    update(teams) {
        this.renderTeams(teams);
    }

    renderTeams(teams) {
        teams.forEach((team) => {
            if (!document.getElementById(`team-${team.name}`)) {
                const teamElement = this.createTeamElement(team);
                this.teamListElement.appendChild(teamElement);
            }
        });
    }

    createTeamElement(team) {
        const li = document.createElement("li");
        li.id = `team-${team.name}`; // 각 팀마다 고유 ID 부여
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
        // 세부 정보를 textContent를 사용하여 업데이트
        this.namePara.textContent = `Name: ${member.name}`;
        this.deptPara.textContent = `Department: ${member.department}`;
        this.agePara.textContent = `Age: ${member.age}`;
    }
}
