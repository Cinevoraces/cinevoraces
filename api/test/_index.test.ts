import TestServer from './_TestServer';
import AUTHENTICATION_API from './authentication';

const _testServer = new TestServer();
export type TTestServer = typeof _testServer;

beforeAll(async () => {
  await _testServer.start();
  _testServer.client = await _testServer.pool.connect();
});

afterAll(async () => {
  _testServer.client.release();
  await _testServer.stop();
});

AUTHENTICATION_API(_testServer);
