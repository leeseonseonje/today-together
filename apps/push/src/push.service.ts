import { Injectable } from '@nestjs/common';
import {FirebaseAdmin, InjectFirebaseAdmin} from 'nestjs-firebase';

@Injectable()
export class PushService {

  // private fcm;
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  // async fcmTest() {
  //   const fcmConfig = require('./fcm-config.json');
  //   console.log(fcmConfig);
  //   admin.initializeApp({
  //     credential: admin.credential.cert(fcmConfig),
  //   });
  //   this.fcm = admin.messaging();
  // }

  async sendTest() {
    const token = 'cPIKe3_pJvadR_BPJ5fNtS:APA91bEYtBHHxKQuoB63mct8c5sdK3MFEZazdQqPK_ajxGFY09sjnR7tOseChVKD7UTmnwePjtDk5xXpzvFwgdK6N3aItkPJIb9TsGWykLDwTwpRm9YBEPTAdG4LdQZZo5m7yQl4vgKG';
    const payload = {
      notification: {
        title: 'nest js FCM',
        body: 'nest js FCM',
      },
      token: token
    }
    let s = await this.firebase.messaging.send(payload);
    console.log(s);
  }
}
