window.addEventListener("load", function () {
    const teamData = {
        name: "Test",
        teams: [
            {
                name: "개발팀",
                members: ["김부장", "이대리", "정사원"],
            },
            {
                name: "개발팀",
                members: ["김부장", "이대리", "정사원"],
            },
            {
                name: "개발팀",
                members: ["김부장", "이대리", "정사원"],
            },
        ],
    };

    const mainTree = document.querySelector(".tree");
    const flabDetails = document.createElement("details");
    const flabSummary = document.createElement("summary");
    flabSummary.textContent = teamData.name;
    flabDetails.appendChild(flabSummary);

    const teamsList = document.createElement("ul");
    flabDetails.appendChild(teamsList);
    mainTree.appendChild(flabDetails);

    teamData.teams.forEach((team) => {
        const teamDetails = document.createElement("details");
        const teamSummary = document.createElement("summary");
        teamSummary.textContent = team.name;
        teamDetails.appendChild(teamSummary);

        const membersList = document.createElement("ul");
        team.members.forEach((member) => {
            const memberLi = document.createElement("li");
            memberLi.textContent = member;
            membersList.appendChild(memberLi);
        });

        teamDetails.appendChild(membersList);
        teamsList.appendChild(teamDetails);
    });
});
