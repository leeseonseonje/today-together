import {Injectable} from '@nestjs/common';
import {FirebaseAdmin, InjectFirebaseAdmin} from 'nestjs-firebase';
import {PushRepository} from '../repository/push.repository';
import {LocalDate} from 'js-joda';
import {getConnection} from 'typeorm';
import {PushToken} from 'lib/entity/domains/member/push/push-token.entity';

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

  async send() {
    let memberIds = await this.pushRepository.findIncompleteMemberIds(LocalDate.now());
    const tokens = await this.pushRepository.findPushToken(memberIds);
    const payloads = this.createPayload(tokens);
    return await this.fcm.messaging.sendEach(payloads);
  }

  private createPayload(tokens: string[]) {
    const payloads = [];
    for (const token of tokens) {
      payloads.push({
        token: token,
        notification: {
          title: '미완료 할 일',
          body: '하지 못한 일이 있어요'
        }
      });
    }
    return payloads;
  }
}
