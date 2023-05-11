import {Injectable} from '@nestjs/common';
import {FirebaseAdmin, InjectFirebaseAdmin} from 'nestjs-firebase';
import {PushRepository} from '../repository/push.repository';
import {LocalDate} from 'js-joda';
import {getConnection} from 'typeorm';
import {PushToken} from 'lib/entity/domains/member/push/push-token.entity';
import {NotificationMessage} from '../type/notification-message';

@Injectable()
export class PushService {

  constructor(
    @InjectFirebaseAdmin() private readonly fcm: FirebaseAdmin,
    private readonly pushRepository: PushRepository,
  ) {
  }

  async save(token: string, memberId: string) {
    await getConnection().getRepository(PushToken).save(new PushToken(token, memberId));
  }

  async send(message: NotificationMessage) {
    let memberIds = await this.pushRepository.findIncompleteMemberIds(LocalDate.now());
    const tokens = await this.pushRepository.findPushToken(memberIds);
    return await this.fcm.messaging.sendEach(this.createPayload(tokens, message));
  }

  private createPayload(tokens: string[], message: NotificationMessage) {
    const payloads = [];
    for (const token of tokens) {
      payloads.push({
        token: token,
        notification: message
      });
    }
    return payloads;
  }
}
