var dbPromised = idb.open("footballers", 1, function (upgradeDb) {
  var teamObjectStore = upgradeDb.createObjectStore("teams");
  teamObjectStore.createIndex("name", "name", { unique: false });
  teamObjectStore.createIndex("id", "id", { unique: true });
});

function saveForLater(team) {
  dbPromised
    .then(function (db) {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");
      console.log("team data: ", team);
      const id = team.id;
      console.log(team.id);
      store.add(team, id);
      return tx.complete;
    })
    .then(function () {
      console.log("Anngota berhasil disimpan");
      window.location.replace("/");
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        console.log("Hello");
        console.log(store.getAll());
        console.log("Hello");

        return store.getAll();
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        id = parseInt(id, 10);
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function (team) {
        resolve(team);
        console.dir(team);
      });
  });
}

function deleteById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        id = parseInt(id, 10);
        const tx = db.transaction("teams", "readwrite");
        const store = tx.objectStore("teams");
        store.delete(id);
        return tx.complete;
      })
      .then(function () {
        window.location.replace("/");
      });
  });
}
// var dbPromised = idb.open("footballers", 1, function (upgradeDb) {
//   var teamsObjectStore = upgradeDb.createObjectStore("teams", {
//     keyPath: "ID"
//   });
//   teamsObjectStore.createIndex("team_name", "team_name", { unique: false });
// });

// function saveForLater(team) {
//   dbPromised
//     .then(function (db) {
//       var tx = db.transaction("teams", "readwrite");
//       var store = tx.objectStore("teams");
//       console.log(team);
//       store.add(team.result);
//       return tx.complete;
//     })
//     .then(function () {
//       console.log("Tim berhasil di simpan.");
//     });
// }
