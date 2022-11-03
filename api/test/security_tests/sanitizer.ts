import type { server } from '../utils/testsType';
import { sanitizeString, sanitizeObject } from '../../src/utils/sanitizeHtmlHandler';

export function SECURITY_SANITIZER(server: server) {
  describe('SECURITY_SANITIZER', () => {
    const { app, res } = server;

    test('BASIC BEHAVIOR', () => {
      const TEST_SCRIPT_INJECTION = sanitizeString(
        '<script>alert("Hello World");</script>'
      );
      expect(TEST_SCRIPT_INJECTION).toBe('');
  
      const TEST_STRONG_HTML_TAG = sanitizeString(
        '<strong>jambon</strong>'
      );
      expect(TEST_STRONG_HTML_TAG).toBe('jambon');
  
      const TEST_HTML_ESCAPED_CLOSING = sanitizeString(
        '<script >console.log("tutéféhavoir");</script>'
      );
      expect(TEST_HTML_ESCAPED_CLOSING).toBe('');
    });

    test('SANITIZE UNKNOWN OBJECT', () => {
      const body = {
        test: '<script>alert("tésterCdouter");</script>',
        test2: {
          test: '<script>alert("tésterCdouter");</script>',
          test2: {
            test: '<script>alert("tésterCdouter");</script>',
          } } } as Record<string, unknown>;

      expect(sanitizeObject(body)).toStrictEqual({ 
        test: '', 
        test2: { 
          test: '', 
          test2: { 
            test: '' 
          } } });
    });

    test('SANITIZE PAYLOAD HOOK', async () => {
      // LOG USER
      const login = await app.inject({
        method: 'POST',
        url: '/login',
        payload: { pseudo: res.users[0].user.pseudo, password: res.users[0].user.password },
      });
      const { token } = await login.json();

      const payloadSanitizerTest = await app.inject({
        method: 'PUT',
        url: '/reviews/1',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          comment: '<script>alert("tésterCdouter");</script>',
        },
      });
      expect(await payloadSanitizerTest.json().review.comment).toStrictEqual('');
    });
  });
}
