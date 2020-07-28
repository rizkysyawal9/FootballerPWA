//Get All saved teams from IDB
function getSavedLeagues() {
  getAll().then(function (teams) {
    console.log(teams);
    let teamsHTML = "";
    teams.forEach(function (data) {
      console.log(data);
      teamsHTML += `
              <div class="card center flat" style="background-color: #111111;">
              <a href="team.html?id=${data.id}&saved=true">
                <div class=" card-content white-text">                   
                  <img src="${data.crestUrl}" alt="image" style="max-width:200px; max-height:200px" />                 
                  <h3 white-text>${data.name}</h3>
                  <p>Founded in ${data.founded}</p>
                  <p>Address: ${data.address}</p>
                  <p>Website: ${data.website}</p>
                  <p>Venue: ${data.venue}</p>
                </div>
                </a>
              </div>`;
    });
    document.querySelector("#saved-content").innerHTML = teamsHTML;
  });
}

//Get all saved Team members from single Team from IDB
function getSavedLeagueById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  console.log("id parameters: " + idParam);
  getById(idParam).then(function (data) {
    console.log("data from id parameters: " + data);
    const members = data.squad;
    let membersHTML = "";
    members.forEach(function (squad) {
      membersHTML += `
                        <div class="container">
                        <div class="card grey darken-4">
                        <div class="white-text card-content">
                        <div class="card-title">${squad.name}</div>
                        <p>Position: ${squad.position}</p>
                        <p>Nationality: ${squad.nationality}</p>
                        <p>Role: ${squad.role}</p>
                        </div>
                        </div>
                        </div>
                    `;
    });
    document.querySelector("#members").innerHTML = membersHTML;
  });
}

function deleteSavedLeagueById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  console.log("id that's going to be deleted: " + idParam);
  deleteById(idParam);
}
