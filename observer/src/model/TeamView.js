import { Subject } from "./Subject.js";

export class TeamView extends Subject {
    constructor(containerId) {
        super();
        this.teamContainer = document.getElementById(containerId);
        this.teamListElement = this.initializeUI();
    }

    initializeUI() {
        this.ul = document.createElement("ul");
        this.teamContainer.appendChild(this.ul);

        this.teamListElement = this.teamContainer.querySelector("ul");
        return this.teamListElement;
    }

    renderTeams(teams) {
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
    }

    createTeamElement(team) {
        const li = document.createElement("li");
        li.id = `team-${team.name}`;
        const details = document.createElement("details");
        const summary = document.createElement("summary");
        summary.textContent = team.name;
        const membersList = document.createElement("ul");

        team.members.forEach((member) => {
            const memberLi = document.createElement("li");
            memberLi.textContent = member.name;
            memberLi.onclick = () => this.onMemberClick(member);
            membersList.appendChild(memberLi);
        });

        details.appendChild(summary);
        details.appendChild(membersList);
        li.appendChild(details);
        return li;
    }

    onMemberClick(member) {
        this.notifyObservers(member);
    }
}
