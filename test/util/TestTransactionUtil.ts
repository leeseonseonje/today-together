import {DataSource, QueryRunner} from 'typeorm';

export class TransactionUtil {

  static async getTransaction(ds: DataSource) {
    const queryRunner = ds.createQueryRunner();
    await queryRunner.startTransaction();
    return queryRunner;
  }

  static async rollback(ds: DataSource, qr: QueryRunner) {
    await qr.rollbackTransaction();
    await qr.release();
    await ds.destroy();
  }
}
