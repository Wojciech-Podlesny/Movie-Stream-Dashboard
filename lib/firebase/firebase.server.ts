import { cert, getApps, initializeApp, App, ServiceAccount } from "firebase-admin/app";

const serviceAccount: ServiceAccount = {
  projectId: "move-stream-dashboard",
  clientEmail: "firebase-adminsdk-w1kqb@move-stream-dashboard.iam.gserviceaccount.com",
  privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCunJFpe80VV5uJ\nSoctbTvlFbczvU+eYTHjlq8dyR9qnktf/4JtdvFzkDMLvdwyAba997UJciSWIz/G\ngSQ4IQZW5pfoOTdf9R+uucgJ02a6rfIgYUsnrI3N7qhXadYDKOCQzjJOExPXiv1x\n9h2Cn6kpbxjRa/IX7i2yywf7BR6U7DXoclIvkiIwREbLGU+HRiVVbpnRAj3qrBwZ\n3MVOTFh4gaw45qkDY2tJS/xuOJlZpBbdkwOg23v2lBuUhMwN2plFnMn0uNEt/1rt\nUXj/t9aEBtUwsWsjAr5p5v9Gvr1N0v1gBFrGNRidqmT9BD/T7y8oTauG4wdgTB0B\nqc16QyyHAgMBAAECggEADFDZxs1nITa9LzlVAITAYT+fXORg7cRgPvO9ZUXu09fX\nbC169xqZHDQTDaR2GAbb61lB6SkmYHqbAHbSZa0ao91+4G/MspV5Bxtuexbwm4Ey\nX0tNgD5hACHxuLyrziw/bqdEkBIzZ5QTnUqlOTXmuhfucbMB7+MqUP6WEQQC7LEA\nhECBXBPbzrbRC/M2nTONRg5O6wjNJajWZNEwvCZAVzFlQSFCHkz9kW/v6K79Owrg\npFUiXDBWGemcfUBXsMHOkRBUDQ/x3EXpgLqeniFaosSJIk0/lNJJyf6DQiKZNq0y\ncg/ybcbSrCCee9khwQeFVxTwRUOiQ/RoLf9V8r+0uQKBgQDooE97waxanpIvngwe\n9hFi8CNBCmpNC2ZxNXLX4m+pxrxP+BLLbjj8Y92JTgHMr0rpIHcO8Z4RiX2C5086\n9HIsXIlEpyNqESxSB6YO05PKJygz/wDYtiJahO3c1KyG9QpsRUtxqpY6TcvNAeLM\n4Iihf/GyXHKpNi9MmNnnASdQrwKBgQDAJ/xsrJO9EgHaUyrJlyaAA+bb3zndoRuE\n+aXY2ybIejz1jBcOl4NwLIps/+CFKpr9NouJ1g0ihwXLKgxIhD0SV23liLsmP8E9\n+Ohl5OwLBuF1pU3/8BwVyooi75K0i6f32ZmQtPwwToYy8Ivi3hBGyqcNAjzHTQxx\nBTxXAM/nqQKBgHfKNaPw86Qmi/jhVjSLWiCssDrJ9jt+Z15cu6rX+9BdepNjl6oS\nNF4jvuz5souIqPartSOI4HD/cBZ8rpwZTMHzVOx5dQ8lkMEdFzIDWdN7noRICFOQ\nVthuI17YVY+Zl6hxdowt3/ZeIViMZBJEfZdMn1XNrW3dbTXwcCU4vtoZAoGAdqx7\nVjajK6LiaA7zHvttuKQwQNy1ZS5py49PIQYABtKPsWqqlsV2VKH9f+HrrPKqM/Yq\n6Z68D/Xp2xaF7YdWHGzIn3j5dF7tnrOJ+9wM96ZxOfI0oPuOrNqgw4DITx7tRsIp\n+Ff+ZGsqsG0lR6Cz1rSzxPH7zW7FX0vHf0guHrkCgYEAsi8ypnXIHOGrNLG9mU4T\nrtNr9ursEUsElnFg2Rn06PKOo8HHhS7QU3Bz+yv/QwbHM+0jJ/1pvwJN414t4PoK\nGspXfjCTC/kVL+Di2wYfnlrlzPLABibpDR0ZDipHupWZBnrTxMUqA4TyyTMd/x8z\n9t+9gApcm+P2wnbTtUNx8kE=\n-----END PRIVATE KEY-----\n",
};

export function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  return initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });
}