export namespace GetUsers {
    export interface Select {
        propositions?: boolean;
        reviews?: boolean;
        metrics?: boolean;
        movies?: boolean;
    }
    export interface Where {
        id?: number | undefined;
        pseudo?: string;
        mail?: string;
        role?: string;
    }
}
