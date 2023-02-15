export type postErrorType = {
	errors: {
		content: string;
		picture: string;
	};
};

export type Repo = {
	name: string;
	html_url: string;
	stargazers_count: number;
	description: string;
}

export type postType = {
    collectionId: string;
    id: string;
	picture: string;
	content: string;
	author: string;
	title: string;
	slug: string;
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
