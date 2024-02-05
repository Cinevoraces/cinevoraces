import type { templates } from '@src/templates';

export interface ISMTPClient {
    sendMail: SendMail;
    setSandbox: (isSandbox: boolean) => void;
    isSandbox: () => boolean;
}

export type SendMail = (
    to: { pseudo: string; mail: string },
    type: EmailType,
    params?: Record<string, string>,
) => Promise<{ status: number }>;

export type EmailType = keyof typeof templates;
