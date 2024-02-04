import { SMTPClient } from '../../src/classes';

describe('classes.SMTPClient.ts', () => {
    const to = { mail: 'gregory.michalak.192@gmail.com', pseudo: 'Test' };
    const params = { url: 'www.cinevoraces.fr/films' };

    let client: InstanceType<typeof SMTPClient>;

    it('contructor()', () => {
        client = new SMTPClient();
        client.setSandbox(true);

        expect(client).toBeInstanceOf(SMTPClient);
        expect(client.isSandbox()).toBe(true);
    });

    it('sendMail()', async () => {
        const res = await client.sendMail(to, 'confirmMail', params);
        expect(res.status).toBe(201);
    });
});
