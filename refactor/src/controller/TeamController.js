export class TeamController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.addObserver(this);
    }

    update() {
        console.log("4. 다시 Controller에서 update");
        this.view.update(this.model.getTeams());
    }

    //TODO: 아 뭔가 조금씩 되긴한다ㅋㅋㅋ 여기서 이걸 분리하고 ㅇㅇ..
    addTeam(team) {
        console.log("1. Controller addTeam() : ", team);
        this.model.addTeam(team);
    }
}
