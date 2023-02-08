export type postType = {
    errors: {
        content: string;
        picture: string;
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