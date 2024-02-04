export interface IEmailTemplate {
    insertParams: InsertParams;
    setDestination: SetDestination;
}

export type SetDestination = (to: { pseudo: string; mail: string }) => void;
export type InsertParams = (params: Record<string, string>) => string;
