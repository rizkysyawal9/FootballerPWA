//Get Single Team & Team Members
function getLeagueById() {
  return new Promise(function (resolve, reject) {
    const urlParams = new URLSearchParams(window.location.search);
    const idParams = urlParams.get("id");
    // from cache
    if ("caches" in window) {
      caches.match(`${base_url}/teams/${idParams}`).then(function (res) {
        if (res) {
          res.json().then(function (data) {
            const members = data.squad;
            let membersHTML = "";
            teamHTML = `
              <div class="card center flat" style="background-color: #111111;">
                <div class=" card-content white-text">                   
                    <img src="${data.crestUrl}" alt="image" style="max-width:200px; max-height:200px" />                 
                    <h3 white-text>${data.name}</h3>
                    <p>Founded in ${data.founded}</p>
                    <p>Address: ${data.address}</p>
                    <p>Website: ${data.website}</p>
                    <p>Venue: ${data.venue}</p>
                </div>
              </div>
              `;
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
            document.querySelector("#team-member").innerHTML = teamHTML;
            document.querySelector("#members").innerHTML = membersHTML;
            resolve(data);
          });
        }
      });
    }
    // from server
    fetch(`${base_url}/teams/${idParams}`, {
      method: "GET",
      headers: {
        "X-Auth-Token": api_key
      }
    })
      .then(status)
      .then(json)
      .then(function (data) {
        const members = data.squad;
        let membersHTML = "";
        teamHTML = `
          <div class="card center flat" style="background-color: #111111;">
            <div class=" card-content white-text">                   
                <img src="${data.crestUrl}" alt="image" style="max-width:200px; max-height:200px" />                 
                <h3 white-text>${data.name}</h3>
                <p>Founded in ${data.founded}</p>
                <p>Address: ${data.address}</p>
                <p>Website: ${data.website}</p>
                <p>Venue: ${data.venue}</p>
            </div>
          </div>
          `;
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
        document.querySelector("#team-member").innerHTML = teamHTML;
        document.querySelector("#members").innerHTML = membersHTML;
        resolve(data);
      })
      .catch(error);
  });
}
