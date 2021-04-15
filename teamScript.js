document.getElementById("resultsButton").addEventListener("click", function(event) {

  event.preventDefault();
  const team = document.getElementById("teamSelector").value;
  if (team === "")
    return;
  console.log("team="+team);
  const season = document.getElementById("seasonSelector").value;
  if (season === "")
    return;
  console.log("season="+season);

  const url = "https://www.balldontlie.io/api/v1/games?season[]=" + season + "&team_ids[]=" + team;

  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {

      let results = "<table><tr><th>Date</th></th><th>Opponent</th><th>Final Score</th></tr>";
      for(var i = 0; i < json.data.length; i++){
        let g = json.data[i];
        results += "<tr><td>";
        results += moment(g.date).format('MMMM Do');
        results += "</td><td>";
        let homeTeam = g.home_team.id == team ? "vs" : "@";
        let teamScore = homeTeam === "@" ? g.visitor_team_score : g.home_team_score;
        let opponentScore = homeTeam === "@" ? g.home_team_score : g.visitor_team_score;
        results += homeTeam + " ";
        results += homeTeam === "@" ? g.home_team.full_name : g.visitor_team.full_name;
        results += "</td><td>";
        results += teamScore + "-" + opponentScore;
        results += "</td></tr>";
      }
      results += "</table>";

      document.getElementById("teamResults").innerHTML = results;
    });
});

function loadTeams()
{
  console.log("loadTeams!");

  const url = "https://www.balldontlie.io/api/v1/teams";

  // Build season selector out
  let results = "";
  for(var i = 0; i < 25; i++){
    results += "<option value='" + (2021-i) + "'>" + (2021-i) + "</option>";
  }
  document.getElementById("seasonSelector").innerHTML = results;

  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      for(var i = 0; i < json.data.length; i++){
        let p = json.data[i];
        results += "<option value='" + json.data[i].id + "'>" + json.data[i].full_name + "</option>";
      }

      document.getElementById("teamSelector").innerHTML = results;
    });
}
