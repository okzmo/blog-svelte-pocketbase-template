export type postType = {
    errors: {
        content: string;
    };
};

export type registerType = {
    data: {
        email: string;
    };
    errors: {
        email: string;
        password: string;
        passwordConfirm: string;
    };
};