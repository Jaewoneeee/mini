import { Subject } from "./Subject.js";

export class TeamModel extends Subject {
    constructor() {
        super();
        this.teams = [];
        //console.log("Model's This : ", this);
    }

    addTeam(team) {
        this.teams.push(team);
        console.log("2. Model에서 addTeam() 실행");
        console.log(this.teams);
        // TODO: 그치 여기서 그냥 이 옵저버를 제거하는거야ㅇㅇ..
        this.notifyObservers();
    }

    getTeams() {
        console.log("5. Model에서 각 team을 return해줌");
        return this.teams;
    }
}
