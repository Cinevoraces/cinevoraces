import Brevo from '@getbrevo/brevo';
import type { ISMTPClient, SendMail } from './types';

//https://www.npmjs.com/package/@getbrevo/brevo

export default class SMTPClient implements ISMTPClient {
    private client: Brevo.TransactionalEmailsApi;

    constructor() {
        this.client = new Brevo.TransactionalEmailsApi();
        this.client.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
    }

    public sendMail: SendMail = async opts => {
        const email = new Brevo.SendSmtpEmail();

        email.subject;
    };
}
