if (!("serviceWorker" in navigator)) {
  console.log("Service worker tidak didukung di browser ini");
} else {
  registerServiceWorker();
  requestPermission();
}

function registerServiceWorker() {
  return navigator.serviceWorker
    .register("service-worker.js")
    .then(function (registration) {
      console.log("Registrasi Service Worker berhasil");
      return registration;
    })
    .catch(function (err) {
      console.error("Registrasi service worker gagal.", err);
    });
}

function requestPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then(function (res) {
      if (res === "denied") {
        console.log("Fitur notifikasi tidak diizinkan");
        return;
      } else if (res === "default") {
        console.error("Pengguna menutup kotak dialog permintaan");
        return;
      }
      navigator.serviceWorker.ready.then(function () {
        if ("PushManager" in window) {
          navigator.serviceWorker
            .getRegistration()
            .then(function (registration) {
              registration.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64toUint8Array(
                    "BCTWuRE6M2ufeZqW7cEPnRT-bq2YNnSQSTJeokNwNOiCPv5DjycdwhsAaOyz2JrE6_7e96s2JoMjQowB20cr6yc"
                  )
                })
                .then(function (subscribe) {
                  console.log(
                    "Berhasil melakukan subscribe dengan endpoint: ",
                    subscribe.endpoint
                  );
                  console.log(
                    "Berhasil melakukan subscribe dengan p256dh key: ",
                    btoa(
                      String.fromCharCode.apply(
                        null,
                        new Uint8Array(subscribe.getKey("p256dh"))
                      )
                    )
                  );
                  console.log(
                    "Berhasil melakukan subscribe dengan auth key: ",
                    btoa(
                      String.fromCharCode.apply(
                        null,
                        new Uint8Array(subscribe.getKey("auth"))
                      )
                    )
                  );
                })
                .catch(function (e) {
                  console.log(e);
                  console.log("Tidak dapat melakukan subscribe");
                });
            });
        }
      });

      function urlBase64toUint8Array(base64String) {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
          .replace(/-/g, "+")
          .replace(/_/g, "/");
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; i++) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      }
    });
  }
}
