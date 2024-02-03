import * as Brevo from '@getbrevo/brevo';
import { templates } from '@src/templates';
import type { ISMTPClient, SendMail } from './types';

//https://www.npmjs.com/package/@getbrevo/brevo
//https://developers.brevo.com/docs/using-sandbox-mode-to-send-an-email

export default class SMTPClient implements ISMTPClient {
    private client: Brevo.TransactionalEmailsApi;
    private account: Brevo.AccountApi;
    private headers: Record<string, string>;
    private templates = templates;

    constructor() {
        this.client = new Brevo.TransactionalEmailsApi();
        this.account = new Brevo.AccountApi();
        this.client.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
        this.account.setApiKey(Brevo.AccountApiApiKeys.apiKey, process.env.BREVO_API_KEY);

        if (process.env.NODE_ENV === 'development') {
            this.headers = { 'X-Sib-Sandbox': 'drop' };
        }
    }

    public sendMail: SendMail = async (to, template, params = {}) => {
        const email = new Brevo.SendSmtpEmail();

        email.subject = this.templates[template].subject;
        email.headers = this.headers;
        email.htmlContent = this.templates[template].content;
        email.sender = { name: 'Cinévoraces', email: 'cinevoraces@gmail.com' };
        email.to = [{ email: to.mail, name: to.pseudo }];
        email.params = { ...to, ...params };

        await this.client.sendTransacEmail(email, { headers: this.headers });
    };
}
