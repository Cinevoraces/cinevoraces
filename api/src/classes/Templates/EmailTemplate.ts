import * as Brevo from '@getbrevo/brevo';
import { brevoConfig } from '@src/config';
import { html } from '@src/utils/templateStrings';
import type { IEmailTemplate, InsertParams, SetDestination } from './types';

export default class EmailTemplate implements IEmailTemplate {
    private isSandbox = process.env.NODE_ENV === 'development';
    private sender = brevoConfig.sender;

    public headers: { headers: Record<string, string> };
    public template: Brevo.SendSmtpEmail;

    constructor(subject: string, content: string, styles?: string[]) {
        this.template = new Brevo.SendSmtpEmail();

        this.template.subject = subject;
        this.template.sender = this.sender;
        this.template.htmlContent = this.buildContent(content, styles);

        if (this.isSandbox) this.headers = { headers: { 'X-Sib-Sandbox': 'drop' } };
    }

    public insertParams: InsertParams = params => {
        throw new Error('Method not implemented.');
    };

    public setDestination: SetDestination = to => {
        this.template.to = [{ email: to.mail, name: to.pseudo }];
    };

    private buildContent = (content: string, styles?: string[]) => html`
        <html>
            <head>
                ${styles ? styles.join('') : ''}
            </head>
            <body>
                ${content}
            </body>
        </html>
    `;
}
