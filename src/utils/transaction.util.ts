/* eslint-disable import/prefer-default-export */
import * as mongoose from 'mongoose';
import { TransactionOptions, WithTransactionCallback } from 'mongodb';

export const withTransaction = async (operations: WithTransactionCallback<any>) => {
  const session = await mongoose.startSession();
  let transactionResults;
  try {
    const transactionOptions: TransactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' },
    };
    await session.withTransaction(operations, transactionOptions);
  } finally {
    await session.endSession();
  }
  return transactionResults;
};
