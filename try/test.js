// 1. model은 controller와 view에 의존하지 않아야 한다.
// 2. view는 model에 의존해야 하고 controller에 의존하지 않아야 한다.
// 3. view가 model로부터 데이터를 받을 때는, 사용자마다 다르게 보여주어야 하는 데이터에 대해서만 받아야한다.
// 4. controller는 model과 view에 의존해도 된다.
// 5. view가 model로부터 데이터를 받을때, 반드시 controller를 통해서 받아야 한다.

class Observer {
    update(subject) {}
}

class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }

    notifyObservers() {
        this.observers.forEach((observer) => observer.update(this));
    }
}

class TeamModel extends Subject {
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

class TeamView extends Observer {
    constructor(containerId, detailsContainerId) {
        super();
        this.container = document.getElementById(containerId);
        this.detailsContainer = document.getElementById(detailsContainerId);
        console.log("View's This : ", this);
    }

    // update(model) {
    //     this.render(model.getTeams());
    // }

    update(teams) {
        this.render(teams);
    }

    render(teams) {
        console.log(teams);
        this.container.innerHTML = "";
        const ul = document.createElement("ul");
        //ul.className = "tree";
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
        this.detailsContainer.innerHTML = `<h3>${member.name}</h3><p>부서: ${member.department}</p><p>나이: ${member.age}</p>`;
        const test = document.createElement("p");
        test.textContent = "test";
        this.detailsContainer.appendChild(test);
    }
}

class TeamController {
    // constructor(model) {
    //     this.model = model;
    // }

    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.addObserver(this);
    }

    update() {
        this.view.update(this.model.getTeams());
    }

    // addTeam(name, members) {
    //     this.model.addTeam({ name, members });
    // }

    addTeam(team) {
        this.model.addTeam(team);
    }
}

const model = new TeamModel();
const view = new TeamView("team-container", "details-container");
//model.addObserver(view);
//const controller = new TeamController(model);
const controller = new TeamController(model, view);

// 예제 데이터 추가
// controller.addTeam("개발팀", [
//     { name: "김부장", department: "소프트웨어", age: 38 },
//     { name: "이대리", department: "소프트웨어", age: 29 },
//     { name: "정사원", department: "소프트웨어", age: 25 },
// ]);
// controller.addTeam("디자인팀", [
//     { name: "박부장", department: "디자인", age: 45 },
//     { name: "홍대리", department: "디자인", age: 31 },
// ]);
// controller.addTeam("기획팀", [
//     { name: "황부장", department: "기획", age: 41 },
//     { name: "백대리", department: "기획", age: 34 },
// ]);

class Team {
    constructor(name, members) {
        console.log(members);
        this.name = name;
        // this.members = members.map((member) => new TeamMember(member.name, member.department, member.age));
        this.members = members;
    }
}
class TeamMeber {
    constructor(name, department, age) {
        this.name = name;
        this.department = department;
        this.age = age;
    }
}

const member1 = new TeamMeber("김부장", "소프트웨어", 38);
const member2 = new TeamMeber("김부장", "소프트웨어", 38);
const team1 = new Team("QA팀", [member1, member2]);
controller.addTeam(team1);

// function createMember(name, department, age) {
//     return new TeamMember(name, department, age);
//   }

//   const members = [
//     createMember("김부장", "소프트웨어", 38),
//     createMember("김부장", "소프트웨어", 38),
//   ];

//   const team1 = new Team("QA팀", {
//     members,
//   });
