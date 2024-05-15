import { TeamView } from "./src/model/TeamView.js";
import { DetailsView } from "./src/view/DetailView.js";

class Team {
    constructor(name, members) {
        this.name = name;
        this.members = members.map((member) => new TeamMember(...member));
    }
}

class TeamMember {
    constructor(name, department, age) {
        this.name = name;
        this.department = department;
        this.age = age;
    }
}

const teamData = [
    // TODO: 데이터 구조 개선(확장성 고려할것. 이 팀 밑에 한단계 더 팀이 들어간다면?)
    {
        name: "개발팀",
        members: [
            ["김부장", "소프트웨어", 45],
            ["오과장", "소프트웨어", 38],
            ["장사원", "소프트웨어", 30],
        ],
    },
    {
        name: "QA팀",
        members: [
            ["나부장", "QA", 45],
            ["이사원", "QA", 30],
        ],
    },
    {
        name: "기획팀",
        members: [
            ["정부장", "기획팀", 45],
            ["방과장", "기획팀", 38],
            ["배사원", "기획팀", 30],
        ],
    },
];

const teamView = new TeamView("team-container");
const detailsView = new DetailsView("details-container");

// detailsView를 teamView의 옵저버로 만들자
teamView.addObserver(detailsView);
//teamView.update(teamData);
const teams = [];

teamData.forEach((teamInfo) => {
    const team = new Team(teamInfo.name, teamInfo.members);
    teams.push(team);
});
teamView.renderTeams(teams);

//초과의존
//SSOT 단일 진실 공급원
