import type { templates } from '@src/templates';

export interface ISMTPClient {
    sendMail: SendMail;
}

export type SendMail = (to: { pseudo: string; mail: string }, template: EmailTemplate) => Promise<void>;

export type EmailTemplate = keyof typeof templates;
