document.addEventListener("DOMContentLoaded", function () {
  // Loading Side Navbar
  function loadSideNav() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;
        const res = xhr.responseText;
        document.querySelectorAll(".sidenav").forEach(function (elm) {
          elm.innerHTML = xhr.responseText;
        });
        document.querySelectorAll(".sidenav a").forEach(function (elm) {
          elm.addEventListener("click", function (event) {
            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            console.log(event.target.getAttribute("href"));
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhr.open("GET", "sidenav.html", true);
    xhr.send();
  }

  // //  Loading Top Navbar
  function loadMainNav() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;
        const res = xhr.responseText;
        document.querySelectorAll(".topnav").forEach(function (elm) {
          elm.innerHTML = xhr.responseText;
        });
        document.querySelectorAll(".topnav a").forEach(function (elm) {
          elm.addEventListener("click", function (event) {
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhr.open("GET", "mainav.html", true);
    xhr.send();
  }

  //Load Page when selected
  function loadPage(page) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        let content = document.querySelector(".content");
        if (page === "home") {
          getLeague();
        } else if (page === "saved") {
          getSavedLeagues();
        }
        if (this.status == 200) {
          content.innerHTML = xhr.responseText;
        } else if (this.status == 404) {
          content.innerHTML = `<h1 class="white-text center">Sorry, this page is not found</h1>`;
        } else {
          content.innerHTML = `<h1 class="white-text center">Sorry, you can't access this page</h1>`;
        }
      }
    };
    xhr.open("GET", "pages/" + page + ".html", true);
    xhr.send();
  }

  //Logo Event Listener
  const logo = document.querySelector("#logo");
  logo.addEventListener("click", function (event) {
    page = event.target.getAttribute("href").substr(1);
    loadPage(page);
  });

  //Sidenav
  const elements = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elements);
  loadSideNav();
  loadMainNav();

  //Page Directory
  let page = window.location.hash.substr(1);
  if (page === "") page = "home";
  loadPage(page);
});
