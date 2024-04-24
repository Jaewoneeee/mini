import { Subject, Observer } from "./observer.js";

export class TeamController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.addObserver(this);
    }

    update() {
        this.view.update(this.model.getTeams());
    }

    addTeam(team) {
        this.model.addTeam(team);
    }
}

export class TeamModel extends Subject {
    constructor() {
        super();
        this.teams = [];
        console.log("Model's This : ", this);
    }

    addTeam(team) {
        this.teams.push(team);
        this.notifyObservers();
    }

    getTeams() {
        return this.teams;
    }
}

export class TeamView extends Observer {
    constructor(containerId, detailsContainerId) {
        super();
        this.container = document.getElementById(containerId);
        this.detailsContainer = document.getElementById(detailsContainerId);
        console.log("View's This : ", this);
    }

    update(teams) {
        this.render(teams);
    }

    render(teams) {
        console.log(teams);
        this.container.innerHTML = "";
        const ul = document.createElement("ul");
        ul.className = "tree";
        teams.forEach((team) => {
            const li = document.createElement("li");
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
            ul.appendChild(li);
        });
        this.container.appendChild(ul);
    }

    displayMemberDetails(member) {
        this.detailsContainer.innerHTML = `<p>나이: ${member.name}</p><p>부서: ${member.department}</p><p>나이: ${member.age}</p>`;
        // const test = document.createElement("p");
        // test.textContent = "test";
        // this.detailsContainer.appendChild(test);
    }
}
