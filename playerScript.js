document.getElementById("playerSubmit").addEventListener("click", function(event) {

  event.preventDefault();

  const value = document.getElementById("playerInput").value;
  if (value === "")
    return;
  console.log(value);

  const url = "https://www.balldontlie.io/api/v1/players?search=" + value;

  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "<table><tr><th>First Name</th><th>LastName</th><th>Position</th><th>Height</th><th>Weight</th><th>Team</th><th>Conference</th><th>Division</th></tr>";
      for(var i = 0; i < json.data.length; i++){
        let p = json.data[i];
        results += "<tr><td>";
        results += p.first_name;
        results += "</td><td>";
        results += p.last_name;
        results += "</td><td>";
        results += p.position;
        results += "</td><td>";
        let feet = p.height_feet == null ? "" : p.height_feet + "'";
        let inches = p.height_inches == null ? "" : p.height_inches + "\"";
        results += feet + inches;
        results += "</td><td>";
        let weight = p.weight_pounds == null ? "" : p.weight_pounds + "lbs";
        results += weight;
        results += "</td><td>";
        results += p.team.full_name;
        results += "</td><td>";
        results += p.team.conference;
        results += "</td><td>";
        results += p.team.division;
        results += "</td></tr>";
      }
      results += "</table>";

      document.getElementById("playerResults").innerHTML = results;
    });
});
