import * as Brevo from '@getbrevo/brevo';
import { brevoConfig } from '@src/config';
import { templates } from '@src/templates';
import { EmailTemplate } from '../../Templates';
import type { ISMTPClient, SendMail } from './types';

export default class SMTPClient implements ISMTPClient {
    private headers: Record<string, string>;
    private templates = templates;
    private client: Brevo.TransactionalEmailsApi;

    constructor() {
        this.client = new Brevo.TransactionalEmailsApi();
        this.client.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, brevoConfig.apiKey);
        if (process.env.NODE_ENV === 'development') this.headers = { 'X-Sib-Sandbox': 'drop' };
    }

    public sendMail: SendMail = async (to, type, params = {}) => {
        const template = new EmailTemplate({ ...this.templates[type], to, params });
        template.setHeaders(this.headers);
        const email = template.getEmail();
        const { response } = await this.client.sendTransacEmail(email);
        return { status: response.statusCode };
    };

    public isSandbox = () => {
        if (this.headers === undefined) return false;
        return JSON.stringify(this.headers) === JSON.stringify({ 'X-Sib-Sandbox': 'drop' });
    };

    public setSandbox = (bool: boolean) => {
        if (bool) this.headers = { 'X-Sib-Sandbox': 'drop' };
        else this.headers = undefined;
    };
}
