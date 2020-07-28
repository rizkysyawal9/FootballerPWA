var webPush = require("web-push");
const vapidKeys = {
  publicKey:
    "BB5CRq01RedSBQvqJqX_nLiBNbzf5gxKu6oYFaXGlL7F0v0hyLny2h17hCBGvheFpM2F_JtdVo40RpgKys0PCmk",
  privateKey: "849xC-d6bmjXyP-HzlxQIlXAsauUtWc-alzu6rwJGxM"
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/frHG9G_j5l0:APA91bEMgkoLC0DlGQC_d5kADGj_6gD571Tot4hgwsxXnxHzHWboJE-tVC0cryZj359bqoqnxtsdv1_xMwq_iTFvNwjQar2PH7PXUufuFTBXkYogD-Ak9bM8CUAZZBCLf7dJKx9T4I0G",
  keys: {
    p256dh:
      "BMT9O2gR5m/RYF3xPkWQwtIgenafXQm2ryn9CvCPiqm7UuIKVLDVz2oRFc+0gOd1N/jVhu3PukgTnNJ5XfJzypg=",
    auth: "KS+sppTQkFL4JljY40X7Dg=="
  }
};

var payload = "Ini adalah push notification untuk submission dicoding 3";

var options = {
  gcmAPIKey: "47055979881",
  TTL: 60
};

webPush.sendNotification(pushSubscription, payload, options);
