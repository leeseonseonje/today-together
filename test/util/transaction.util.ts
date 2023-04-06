import {getConnection, QueryRunner} from 'typeorm';

export class TransactionUtil {
  static async getTransaction() {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction()
    return queryRunner;
  }

  static async rollback(queryRunner: QueryRunner) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
  }
}
