/* eslint-disable no-console */
export default function waitForMongooseConnection(mongoose: any) {
  return new Promise((resolve) => {
    const { connection } = mongoose;
    if (connection.readyState === 1) {
      resolve();
      return;
    }
    console.log('Mongoose connection is not ready. Waiting for open or reconnect event.');
    let resolved = false;
    const setResolved = () => {
      console.log(`Mongoose connection became ready. promise already resolved: ${resolved}`);
      if (!resolved) {
        console.log('Resolving waitForMongooseConnection');
        resolved = true;
        resolve();
      }
    };
    connection.once('open', setResolved);
    connection.once('reconnect', setResolved);
  });
}
