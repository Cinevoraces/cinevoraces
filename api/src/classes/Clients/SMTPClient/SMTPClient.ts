import * as Brevo from '@getbrevo/brevo';
import { brevoConfig } from '@src/config';
import { templates } from '@src/templates';
import type { ISMTPClient, SendMail } from './types';

export default class SMTPClient implements ISMTPClient {
    private client: Brevo.TransactionalEmailsApi;
    private templates = templates;

    constructor() {
        this.client = new Brevo.TransactionalEmailsApi();
        this.client.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, brevoConfig.apiKey);
    }

    public sendMail: SendMail = async (to, template, params = {}) => {
        const email = this.templates[template];
        email.setDestination(to);
        email.insertParams(params);

        const res = await this.client.sendTransacEmail(email.template, email.headers);
        console.log(res.response);
    };
}
