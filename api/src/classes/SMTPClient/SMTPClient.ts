import Brevo from '@getbrevo/brevo';
import { templates } from '@src/templates';
import type { ISMTPClient, SendMail } from './types';

//https://www.npmjs.com/package/@getbrevo/brevo

export default class SMTPClient implements ISMTPClient {
    private client: Brevo.TransactionalEmailsApi;
    private templates = templates;

    constructor() {
        this.client = new Brevo.TransactionalEmailsApi();
        this.client.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
    }

    public sendMail: SendMail = async (to, template, params = {}) => {
        const email = new Brevo.SendSmtpEmail();

        email.subject = this.templates[template].subject;
        email.htmlContent = this.templates[template].content;
        email.sender = { name: 'Cinévoraces', email: 'cinevoraces@gmail.com' };
        email.to = [{ email: to.mail, name: to.pseudo }];
        email.params = { ...to, ...params };

        await this.client.sendTransacEmail(email);
    };
}
