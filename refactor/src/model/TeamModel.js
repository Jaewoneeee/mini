import { Subject } from "./Subject.js";

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
