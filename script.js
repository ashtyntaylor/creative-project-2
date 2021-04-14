document.getElementById("playerSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("playerInput").value;
  if (value === "")
    return;
  console.log(value);
});

const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=APIKEY";
fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json);
  });
GET https://www.balldontlie.io/api/v1/players
