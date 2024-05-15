export class TeamController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.addObserver(this);
    }

    update() {
        this.view.update(this.model.getTeams());
    }

    //TODO: 아 뭔가 조금씩 되긴한다ㅋㅋㅋ 여기서 이걸 분리하고 ㅇㅇ..
    addTeam(team) {
        console.log("첫번째 작업 : ", team);
        this.model.addTeam(team);
    }
}
