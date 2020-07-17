var webPush = require("web-push");
const vapidKeys = {
  publicKey:
    "BCTWuRE6M2ufeZqW7cEPnRT-bq2YNnSQSTJeokNwNOiCPv5DjycdwhsAaOyz2JrE6_7e96s2JoMjQowB20cr6yc",
  privateKey: "mu3QWbLxFe-L40-HKevlDq1IYlDZAQAuwgzo7Lwct7U"
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/f9v_XNdS1wI:APA91bE8q0VxGtsWWZwwgo0yDdVMKwxkmzhbcgDO_vDQmp62CaidaM_Xj4Zc7aKtaQjFZZ-URBngHOb5FWFHGjLrsRyaQDkmYBxtVOMHRLm-AcOlFxMNjQ-lrXKaDwy9nsxQJnyT5gRB",
  keys: {
    p256dh:
      "BAYdw7a31rl69gyqxj8MoXm654x5ANjzOr7h356HUcSw4veJPDnFvgRhY0QrHegsMWxEQi3s8VLIi8ikW4kcojA=",
    auth: "qWivDClJYhlx79rSLoRHFQ=="
  }
};

var payload = "Ini adalah push notification untuk submission dicoding 2";

var options = {
  gcmAPIKey: "994346959178",
  TTL: 60
};

webPush.sendNotification(pushSubscription, payload, options);
