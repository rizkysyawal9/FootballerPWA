function getScheduleById() {
  return new Promise(function (resolve, reject) {
    const urlParams = new URLSearchParams(window.location.search);
    const idParams = urlParams.get("id");
    if ("caches" in window) {
      caches
        .match(`${base_url}/teams/${idParams}/matches`)
        .then(function (res) {
          if (res) {
            res.json().then(function (data) {
              const matches = data.matches;
              let matchesHTML = "";
              matches.forEach(function (match) {
                matchesHTML += `
                        <div class="container">
                        <div class="card grey darken-4 white-text" >
                        <div class="card-content center">
                        <div class="card-title font-weight-bold"><span>${match.homeTeam.name}</span>
                        <br>
                        <strong>VS</strong><br>
                         <span>${match.awayTeam.name}</span></div>
                        <h5>Season</h5>
                        <p>Start Date: ${match.season.startDate}</p>
                        <p>End Date: ${match.season.endDate}</p>
                        <a href="match.html?id=${match.id}" class="btn purple darken-4" style="margin-top:10px">
                        See More
                        </a>
                        </div>
                        </div>
                        </div>
                    `;
              });
              document.querySelector("#schedule").innerHTML = matchesHTML;
              resolve(data);
            });
          }
        });
    }

    fetchApi(`${base_url}/teams/${idParams}/matches`)
      .then(status)
      .then(json)
      .then(function (data) {
        const matches = data.matches;
        let matchesHTML = "";
        matches.forEach(function (match) {
          matchesHTML += `
                    <div class="container">
                    <div class="card grey darken-4 white-text" >
                    <div class="card-content center">
                    <div class="card-title font-weight-bold"><span>${match.homeTeam.name}</span>
                    <br>
                    <strong>VS</strong><br>
                     <span>${match.awayTeam.name}</span></div>
                    <h5>Season</h5>
                    <p>Start Date: ${match.season.startDate}</p>
                    <p>End Date: ${match.season.endDate}</p>
                    <a href="match.html?id=${match.id}" class="btn purple darken-4" style="margin-top:10px">
                    See More
                    </a>
                    </div>
                    </div>
                    </div>
                `;
        });
        document.querySelector("#schedule").innerHTML = matchesHTML;
        resolve(data);
      })
      .catch(error);
  });
}

function getMatchById() {
  return new Promise(function (resolve, reject) {
    const urlParams = new URLSearchParams(window.location.search);
    const idParams = urlParams.get("id");
    if ("caches" in window) {
      caches.match(`${base_url}/matches/${idParams}`).then(function (res) {
        if (res) {
          res.json().then(function (data) {
            const {
              homeTeam,
              awayTeam,
              numberOfMatches,
              totalGoals
            } = data.head2head;
            const { startDate, endDate } = data.match.season;
            let matchHTML = `
                        <div class="container">
                        <div class="card grey darken-4 hoverable white-text">
                        <div class="card-content">
                        <div class="card-title">Home Team: <br> ${homeTeam.name}</div>
                        <p>Wins: ${homeTeam.wins} Draws: ${homeTeam.draws} Losses: ${homeTeam.losses}</p>
                        <br>
                        <div class="card-title">Away Team: <br>${awayTeam.name}</div>
                        <p>Wins: ${awayTeam.wins} Draws: ${awayTeam.draws} Losses: ${awayTeam.losses}</p>
                        <p>Number of Matches: ${numberOfMatches} Number of Goals: ${totalGoals}</p>
                        <br>
                        <div class="card-title">Season</div>
                        <p>Start Date: ${startDate} <br> End Date: ${endDate}</p>
                        </div>
                        </div>
                        </div>
              `;
            document.querySelector("#match").innerHTML = matchHTML;
            resolve(data);
          });
        }
      });
    }
    fetchApi(`${base_url}/matches/${idParams}`)
      .then(status)
      .then(json)
      .then(function (data) {
        const {
          homeTeam,
          awayTeam,
          numberOfMatches,
          totalGoals
        } = data.head2head;
        const { startDate, endDate } = data.match.season;
        let matchHTML = `
                    <div class="container">
                    <div class="card grey darken-4 hoverable white-text">
                    <div class="card-content">
                    <div class="card-title">Home Team: <br> ${homeTeam.name}</div>
                    <p>Wins: ${homeTeam.wins} Draws: ${homeTeam.draws} Losses: ${homeTeam.losses}</p>
                    <br>
                    <div class="card-title">Away Team: <br>${awayTeam.name}</div>
                    <p>Wins: ${awayTeam.wins} Draws: ${awayTeam.draws} Losses: ${awayTeam.losses}</p>
                    <p>Number of Matches: ${numberOfMatches} Number of Goals: ${totalGoals}</p>
                    <br>
                    <div class="card-title">Season</div>
                    <p>Start Date: ${startDate} <br> End Date: ${endDate}</p>
                    </div>
                    </div>
                    </div>
          `;
        document.querySelector("#match").innerHTML = matchHTML;
        resolve(data);
      })
      .catch(error);
  });
}
