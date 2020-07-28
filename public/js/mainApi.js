// API Credentials
var base_url = "https://api.football-data.org/v2";
var api_key = "11bd3cec363a471991cf7a4be5f1d8a1";

// status callback function
function status(res) {
  if (res.status !== 200) {
    console.log(`Error: ${res.status}`);
    return Promise.reject(new Error(res.statusText));
  } else {
    return Promise.resolve(res);
  }
}

// json callback function
function json(res) {
  return res.json();
}

// error callback function
function error(err) {
  console.log(`Error: ${err}`);
}

//Fetch Function
function fetchApi(url) {
  const newurl = url.toString();
  console.log(newurl);
  return fetch(newurl, {
    method: "GET",
    headers: {
      "X-Auth-Token": "11bd3cec363a471991cf7a4be5f1d8a1"
    }
  });
}
// Get Champions League Standings (All teams) in Group A
function getLeague() {
  const url = `${base_url}/competitions/2001/standings`;

  //get data from cahce
  if ("caches" in window) {
    caches.match(url.toString()).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          const standings = data.standings[0];
          let cacheHTML = "";
          standings.table.forEach(function (stands) {
            cacheHTML += `
                <div class="card grey darken-4 hoverable">
                  <div class=" card-content white-text center ">                   
                      <img src="${stands.team.crestUrl}" alt="image" style="max-width:200px; max-height:200px" />                 
                      <div class="hide-on-small-only" style="margin: 20px 0">
                      <h3 white-text>${stands.team.name}</h3>
                      </div>
                      <div class="hide-on-med-and-up card-title" white-text style="margin: 20px 0">
                      ${stands.team.name}
                      </div>
                      <p>
                      
                      </p>
                      <a href="team.html?id=${stands.team.id}" class="btn purple darken-4">
                      Team Members
                      </a>
                      <br />
                      <br />
                      <a href="schedule.html?id=${stands.team.id}" class="btn purple darken-4">
                      Team Schedule
                      </a>  
                
              
                </div>
                </div>
            `;
          });
          document.querySelector("#content").innerHTML = cacheHTML;
          console.log("From cache");
        });
      }
    });
  }
  //  get data from server

  fetchApi(`${base_url}/competitions/2001/standings`)
    .then(status)
    .then(json)
    .then(function (data) {
      const standings = data.standings[0];
      let teamsHTML = "";
      standings.table.forEach(function (stands) {
        teamsHTML += `
                  <div class="card grey darken-4 hoverable">
                    <div class=" card-content white-text center ">                   
                        <img src="${stands.team.crestUrl}" alt="image" style="max-width:200px; max-height:200px" />                 
                        <div class="hide-on-small-only" style="margin: 20px 0">
                        <h3 white-text>${stands.team.name}</h3>
                        </div>
                        <div class="hide-on-med-and-up card-title" white-text style="margin: 20px 0">
                        ${stands.team.name}
                        </div>
                        <p>
                        
                        </p>
                        <a href="team.html?id=${stands.team.id}" class="btn purple darken-4">
                        Team Members
                        </a>
                        <br />
                        <br />
                        <a href="schedule.html?id=${stands.team.id}" class="btn purple darken-4">
                        Team Schedule
                        </a>  
                  
                
                  </div>
                  </div>
              `;
      });
      document.querySelector("#content").innerHTML = teamsHTML;
      console.log("From server");
    })
    .catch(error);
}
