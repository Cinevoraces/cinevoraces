import type * as Brevo from '@getbrevo/brevo';
export interface IEmailTemplate {
    insertParams: InsertParams;
    addDestinator: AddDestinator;
    getEmail: () => Brevo.SendSmtpEmail;
    setHeaders: (headers: Record<string, string>) => void;
}

export interface Constructor {
    subject: string;
    content: string;
    to?: To;
    params?: Record<string, string>;
    styles?: string[];
}

export interface To {
    pseudo: string;
    mail: string;
}

export type AddDestinator = (to: To) => void;
export type InsertParams = (params: Record<string, string>) => void;
