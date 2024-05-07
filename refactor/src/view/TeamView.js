// import { Observer } from "./Observer.js";

// export class TeamView extends Observer {
//     constructor(containerId, detailsContainerId) {
//         super();
//         this.teamContainer = document.getElementById(containerId);
//         this.detailsContainer = document.getElementById(detailsContainerId);
//         this.initializeUI();
//         this.initializeDetails();
//     }

//     initializeUI() {
//         // ul 요소를 확인하고 재활용하거나 새로 생성합니다.
//         this.teamListElement = this.teamContainer.querySelector("ul.tree");
//         if (!this.teamListElement) {
//             const ul = document.createElement("ul");
//             ul.className = "tree";
//             this.teamContainer.appendChild(ul);
//             this.teamListElement = ul;
//         }
//     }

//     // 세부 정보용 DOM 요소를 초기화합니다.
//     initializeDetails() {
//         this.namePara = document.createElement("p");
//         this.deptPara = document.createElement("p");
//         this.agePara = document.createElement("p");
//         this.detailsContainer.appendChild(this.namePara);
//         this.detailsContainer.appendChild(this.deptPara);
//         this.detailsContainer.appendChild(this.agePara);
//     }

//     update(teams) {
//         this.renderTeams(teams);
//     }

//     renderTeams(teams) {
//         // 팀 리스트 업데이트
//         const currentTeams = new Set(
//             this.teamListElement.querySelectorAll("li").values()
//         );
//         teams.forEach((team) => {
//             if (!currentTeams.has(`team-${team.name}`)) {
//                 const teamElement = this.createTeamElement(team);
//                 this.teamListElement.appendChild(teamElement);
//             }
//         });
//     }

//     createTeamElement(team) {
//         const li = document.createElement("li");
//         li.id = `team-${team.name}`;
//         const details = document.createElement("details");
//         const summary = document.createElement("summary");
//         summary.textContent = team.name;
//         const membersList = document.createElement("ul");

//         team.members.forEach((member) => {
//             const memberLi = document.createElement("li");
//             memberLi.textContent = member.name;
//             memberLi.onclick = () => this.displayMemberDetails(member);
//             membersList.appendChild(memberLi);
//         });

//         details.appendChild(summary);
//         details.appendChild(membersList);
//         li.appendChild(details);
//         return li;
//     }

//     displayMemberDetails(member) {
//         this.namePara.textContent = `Name: ${member.name}`;
//         this.deptPara.textContent = `Department: ${member.department}`;
//         this.agePara.textContent = `Age: ${member.age}`;
//     }
// }

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
        console.log("몇번이나?");
        this.ul = document.createElement("ul");
        this.teamContainer.appendChild(this.ul);

        this.teamListElement = this.teamContainer.querySelector("ul");
        return this.teamListElement;
    }

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
    }

    createTeamElement(team) {
        console.log("최초 랜더링?");
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
    // createTeamElement(team) {
    //     console.log(team);
    //     const li = document.createElement("li");
    //     li.id = `team-${team.name}`;
    //     const details = document.createElement("details");
    //     const summary = document.createElement("summary");
    //     summary.textContent = team.name;
    //     const membersList = document.createElement("ul");

    //     team.members.forEach((member) => {
    //         console.log(member);
    //         const memberLi = this.createMemberElement(member);
    //         memberLi.textContent = member.name;
    //         membersList.appendChild(memberLi);
    //     });

    //     if (team.subTeams && team.subTeams.length > 0) {
    //         console.log("d여긴?");
    //         team.subTeams.forEach((subTeam) => {
    //             const subTeamElement = this.createTeamElement(subTeam); // 재귀적 호출
    //             membersList.appendChild(subTeamElement);
    //         });
    //     }

    //     details.appendChild(summary);
    //     details.appendChild(membersList);
    //     li.appendChild(details);
    //     return li;
    // }

    // createMemberElement(member) {
    //     console.log("??", member);
    //     const memberLi = document.createElement("li");
    //     memberLi.textContent = `${member[0]} - ${member[1]} - ${member[2]}`;
    //     memberLi.onclick = () => this.displayMemberDetails(member);
    //     return memberLi;
    // }

    displayMemberDetails(member) {
        console.log("클릭 누적?");
        this.namePara.textContent = `Name: ${member.name}`;
        this.deptPara.textContent = `Department: ${member.department}`;
        this.agePara.textContent = `Age: ${member.age}`;
    }
}
