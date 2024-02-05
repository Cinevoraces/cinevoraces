import * as Brevo from '@getbrevo/brevo';
import { brevoConfig } from '@src/config';
import { html } from '@src/utils';
import type { AddDestinator, Constructor, IEmailTemplate, InsertParams } from './types';

export default class EmailTemplate implements IEmailTemplate {
    private sender = brevoConfig.sender;
    private email: Brevo.SendSmtpEmail;

    constructor({ subject, content, styles, to, params }: Constructor) {
        this.email = new Brevo.SendSmtpEmail();

        this.email.subject = subject;
        this.email.sender = this.sender;
        this.email.to = [];
        this.email.htmlContent = this.buildContent(content, styles);

        if (to) this.addDestinator(to);
        if (params) this.insertParams(params);
    }

    public insertParams: InsertParams = params => {
        let content = this.email.htmlContent;
        Object.entries(params).forEach(([key, value]) => {
            content = content.replace(new RegExp(`{{ ${key} }}`, 'g'), value);
        });
        this.email.htmlContent = content;
    };

    public addDestinator: AddDestinator = to => {
        this.email.to.push({ email: to.mail, name: to.pseudo });
    };

    public setHeaders = (headers: Record<string, string>) => {
        this.email.headers = headers;
    };

    public getEmail = () => this.email;

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
