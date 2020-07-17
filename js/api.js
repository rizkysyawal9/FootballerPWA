// // API Needs
// var base_url = "https://api.football-data.org/v2";
// var api_key = "11bd3cec363a471991cf7a4be5f1d8a1";

// function status(res) {
//   if (res.status !== 200) {
//     console.log(`Error: ${res.status}`);
//     return Promise.reject(new Error(res.statusText));
//   } else {
//     return Promise.resolve(res);
//   }
// }

// function json(res) {
//   return res.json();
// }

// function error(err) {
//   console.log(`Error: ${err}`);
// }

// // Get Champions League Standings Group A
// function getLeague() {
//   if ("caches" in window) {
//     caches
//       .match(`${base_url}/competitions/2001/standings`)
//       .then(function (response) {
//         if (response) {
//           response.json().then(function (data) {
//             const standings = data.standings[0];
//             let cacheHTML = "";
//             standings.table.forEach(function (stands) {
//               cacheHTML += `
//                 <div class="card grey darken-4 hoverable">
//                   <div class=" card-content white-text center ">
//                       <img src="${stands.team.crestUrl}" alt="image" style="max-width:200px; max-height:200px" />
//                       <div class="hide-on-small-only" style="margin: 20px 0">
//                       <h3 white-text>${stands.team.name}</h3>
//                       </div>
//                       <div class="hide-on-med-and-up card-title" white-text style="margin: 20px 0">
//                       ${stands.team.name}
//                       </div>
//                       <p>

//                       </p>
//                       <a href="team.html?id=${stands.team.id}" class="btn purple darken-4">
//                       Team Members
//                       </a>
//                       <br />
//                       <br />
//                       <a href="schedule.html?id=${stands.team.id}" class="btn purple darken-4">
//                       Team Schedule
//                       </a>

//                 </div>
//                 </div>
//             `;
//             });
//             // Sisipkan komponen card ke dalam elemen dengan id #content
//             document.querySelector("#content").innerHTML = cacheHTML;
//             console.log("From cache");
//           });
//         }
//       });
//   }
//   fetch(`${base_url}/competitions/2001/standings`, {
//     method: "GET",
//     headers: {
//       "X-Auth-Token": api_key
//     }
//   })
//     .then(status)
//     .then(json)
//     .then(function (data) {
//       const standings = data.standings[0];
//       let teamsHTML = "";
//       standings.table.forEach(function (stands) {
//         teamsHTML += `
//                   <div class="card grey darken-4 hoverable">
//                     <div class=" card-content white-text center ">
//                         <img src="${stands.team.crestUrl}" alt="image" style="max-width:200px; max-height:200px" />
//                         <div class="hide-on-small-only" style="margin: 20px 0">
//                         <h3 white-text>${stands.team.name}</h3>
//                         </div>
//                         <div class="hide-on-med-and-up card-title" white-text style="margin: 20px 0">
//                         ${stands.team.name}
//                         </div>
//                         <p>

//                         </p>
//                         <a href="team.html?id=${stands.team.id}" class="btn purple darken-4">
//                         Team Members
//                         </a>
//                         <br />
//                         <br />
//                         <a href="schedule.html?id=${stands.team.id}" class="btn purple darken-4">
//                         Team Schedule
//                         </a>

//                   </div>
//                   </div>
//               `;
//       });
//       document.querySelector("#content").innerHTML = teamsHTML;
//       console.log("From server");
//     })
//     .catch(error);
// }

// function getLeagueById() {
//   return new Promise(function (resolve, reject) {
//     const urlParams = new URLSearchParams(window.location.search);
//     const idParams = urlParams.get("id");
//     if ("caches" in window) {
//       caches.match(`${base_url}/teams/${idParams}`).then(function (res) {
//         if (res) {
//           res.json().then(function (data) {
//             const members = data.squad;
//             let membersHTML = "";
//             teamHTML = `
//             <div class="card center flat" style="background-color: #111111;">
//               <div class=" card-content white-text">
//                   <img src="${data.crestUrl}" alt="image" style="max-width:200px; max-height:200px" />
//                   <h3 white-text>${data.name}</h3>
//                   <p>Founded in ${data.founded}</p>
//                   <p>Address: ${data.address}</p>
//                   <p>Website: ${data.website}</p>
//                   <p>Venue: ${data.venue}</p>
//               </div>
//             </div>
//             `;
//             members.forEach(function (squad) {
//               membersHTML += `
//                       <div class="container">
//                        <div class="card grey darken-4">
//                       <div class="white-text card-content">
//                       <div class="card-title">${squad.name}</div>
//                       <p>Position: ${squad.position}</p>
//                       <p>Nationality: ${squad.nationality}</p>
//                       <p>Role: ${squad.role}</p>
//                       </div>
//                       </div>
//                       </div>
//                   `;
//             });
//             document.querySelector("#team-member").innerHTML = teamHTML;
//             document.querySelector("#members").innerHTML = membersHTML;
//             resolve(data);
//           });
//         }
//       });
//     }
//     fetch(`${base_url}/teams/${idParams}`, {
//       method: "GET",
//       headers: {
//         "X-Auth-Token": api_key
//       }
//     })
//       .then(status)
//       .then(json)
//       .then(function (data) {
//         const members = data.squad;
//         let membersHTML = "";
//         teamHTML = `
//         <div class="card center flat" style="background-color: #111111;">
//           <div class=" card-content white-text">
//               <img src="${data.crestUrl}" alt="image" style="max-width:200px; max-height:200px" />
//               <h3 white-text>${data.name}</h3>
//               <p>Founded in ${data.founded}</p>
//               <p>Address: ${data.address}</p>
//               <p>Website: ${data.website}</p>
//               <p>Venue: ${data.venue}</p>
//           </div>
//         </div>
//         `;
//         members.forEach(function (squad) {
//           membersHTML += `
//                   <div class="container">
//                    <div class="card grey darken-4">
//                   <div class="white-text card-content">
//                   <div class="card-title">${squad.name}</div>
//                   <p>Position: ${squad.position}</p>
//                   <p>Nationality: ${squad.nationality}</p>
//                   <p>Role: ${squad.role}</p>
//                   </div>
//                   </div>
//                   </div>
//               `;
//         });
//         document.querySelector("#team-member").innerHTML = teamHTML;
//         document.querySelector("#members").innerHTML = membersHTML;
//         resolve(data);
//       })
//       .catch(error);
//   });
// }

// function getSavedLeagues() {
//   getAll().then(function (teams) {
//     console.log(teams);
//     let teamsHTML = "";
//     teams.forEach(function (data) {
//       console.log(data);
//       teamsHTML += `
//             <div class="card center flat" style="background-color: #111111;">
//             <a href="team.html?id=${data.id}&saved=true">
//               <div class=" card-content white-text">
//                 <img src="${data.crestUrl}" alt="image" style="max-width:200px; max-height:200px" />
//                 <h3 white-text>${data.name}</h3>
//                 <p>Founded in ${data.founded}</p>
//                 <p>Address: ${data.address}</p>
//                 <p>Website: ${data.website}</p>
//                 <p>Venue: ${data.venue}</p>
//               </div>
//               </a>
//             </div>`;
//     });
//     document.querySelector("#saved-content").innerHTML = teamsHTML;
//   });
// }

// function getSavedLeagueById() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const idParam = urlParams.get("id");
//   console.log("id parameters: " + idParam);
//   getById(idParam).then(function (data) {
//     console.log("data from id parameters: " + data);
//     const members = data.squad;
//     let membersHTML = "";
//     members.forEach(function (squad) {
//       membersHTML += `
//                       <div class="container">
//                       <div class="card grey darken-4">
//                       <div class="white-text card-content">
//                       <div class="card-title">${squad.name}</div>
//                       <p>Position: ${squad.position}</p>
//                       <p>Nationality: ${squad.nationality}</p>
//                       <p>Role: ${squad.role}</p>
//                       </div>
//                       </div>
//                       </div>
//                   `;
//     });
//     document.querySelector("#members").innerHTML = membersHTML;
//   });
// }

// function getScheduleById() {
//   return new Promise(function (resolve, reject) {
//     const urlParams = new URLSearchParams(window.location.search);
//     const idParams = urlParams.get("id");
//     if ("caches" in window) {
//       caches
//         .match(`${base_url}/teams/${idParams}/matches`)
//         .then(function (res) {
//           if (res) {
//             res.json().then(function (data) {
//               const matches = data.matches;
//               let matchesHTML = "";
//               matches.forEach(function (match) {
//                 matchesHTML += `
//                       <div class="container">
//                       <div class="card grey darken-4 white-text" >
//                       <div class="card-content center">
//                       <div class="card-title font-weight-bold"><span>${match.homeTeam.name}</span>
//                       <br>
//                       <strong>VS</strong><br>
//                        <span>${match.awayTeam.name}</span></div>
//                       <h5>Season</h5>
//                       <p>Start Date: ${match.season.startDate}</p>
//                       <p>End Date: ${match.season.endDate}</p>
//                       <a href="match.html?id=${match.id}" class="btn purple darken-4" style="margin-top:10px">
//                       See More
//                       </a>
//                       </div>
//                       </div>
//                       </div>
//                   `;
//               });
//               document.querySelector("#schedule").innerHTML = matchesHTML;
//               resolve(data);
//             });
//           }
//         });
//     }

//     fetch(`${base_url}/teams/${idParams}/matches`, {
//       method: "GET",
//       headers: {
//         "X-Auth-Token": api_key
//       }
//     })
//       .then(status)
//       .then(json)
//       .then(function (data) {
//         const matches = data.matches;
//         let matchesHTML = "";
//         matches.forEach(function (match) {
//           matchesHTML += `
//                   <div class="container">
//                   <div class="card grey darken-4 white-text" >
//                   <div class="card-content center">
//                   <div class="card-title font-weight-bold"><span>${match.homeTeam.name}</span>
//                   <br>
//                   <strong>VS</strong><br>
//                    <span>${match.awayTeam.name}</span></div>
//                   <h5>Season</h5>
//                   <p>Start Date: ${match.season.startDate}</p>
//                   <p>End Date: ${match.season.endDate}</p>
//                   <a href="match.html?id=${match.id}" class="btn purple darken-4" style="margin-top:10px">
//                   See More
//                   </a>
//                   </div>
//                   </div>
//                   </div>
//               `;
//         });
//         document.querySelector("#schedule").innerHTML = matchesHTML;
//         resolve(data);
//       })
//       .catch(error);
//   });
// }

// function getMatchById() {
//   return new Promise(function (resolve, reject) {
//     const urlParams = new URLSearchParams(window.location.search);
//     const idParams = urlParams.get("id");
//     if ("caches" in window) {
//       caches.match(`${base_url}/matches/${idParams}`).then(function (res) {
//         if (res) {
//           res.json().then(function (data) {
//             const {
//               homeTeam,
//               awayTeam,
//               numberOfMatches,
//               totalGoals
//             } = data.head2head;
//             const { startDate, endDate } = data.match.season;
//             let matchHTML = `
//                       <div class="container">
//                       <div class="card grey darken-4 hoverable white-text">
//                       <div class="card-content">
//                       <div class="card-title">Home Team: <br> ${homeTeam.name}</div>
//                       <p>Wins: ${homeTeam.wins} Draws: ${homeTeam.draws} Losses: ${homeTeam.losses}</p>
//                       <br>
//                       <div class="card-title">Away Team: <br>${awayTeam.name}</div>
//                       <p>Wins: ${awayTeam.wins} Draws: ${awayTeam.draws} Losses: ${awayTeam.losses}</p>
//                       <p>Number of Matches: ${numberOfMatches} Number of Goals: ${totalGoals}</p>
//                       <br>
//                       <div class="card-title">Season</div>
//                       <p>Start Date: ${startDate} <br> End Date: ${endDate}</p>
//                       </div>
//                       </div>
//                       </div>
//             `;
//             document.querySelector("#match").innerHTML = matchHTML;
//             resolve(data);
//           });
//         }
//       });
//     }

//     const urlParams = new URLSearchParams(window.location.search);
//     const idParams = urlParams.get("id");
//     fetch(`${base_url}/matches/${idParams}`, {
//       method: "GET",
//       headers: {
//         "X-Auth-Token": api_key
//       }
//     })
//       .then(status)
//       .then(json)
//       .then(function (data) {
//         const {
//           homeTeam,
//           awayTeam,
//           numberOfMatches,
//           totalGoals
//         } = data.head2head;
//         const { startDate, endDate } = data.match.season;
//         let matchHTML = `
//                   <div class="container">
//                   <div class="card grey darken-4 hoverable white-text">
//                   <div class="card-content">
//                   <div class="card-title">Home Team: <br> ${homeTeam.name}</div>
//                   <p>Wins: ${homeTeam.wins} Draws: ${homeTeam.draws} Losses: ${homeTeam.losses}</p>
//                   <br>
//                   <div class="card-title">Away Team: <br>${awayTeam.name}</div>
//                   <p>Wins: ${awayTeam.wins} Draws: ${awayTeam.draws} Losses: ${awayTeam.losses}</p>
//                   <p>Number of Matches: ${numberOfMatches} Number of Goals: ${totalGoals}</p>
//                   <br>
//                   <div class="card-title">Season</div>
//                   <p>Start Date: ${startDate} <br> End Date: ${endDate}</p>
//                   </div>
//                   </div>
//                   </div>
//         `;
//         document.querySelector("#match").innerHTML = matchHTML;
//         resolve(data);
//       })
//       .catch(error);
//   });
// }
