export interface POSTRegisterBody {
    Body: {
        pseudo: string;
        mail: string;
        password: string;
    };
}

export interface POSTLoginBody {
    Body: {
        pseudo?: string;
        mail?: string;
        password: string;
    };
}
