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
		username: string;
		name: string;
	};
	errors: {
		email: string;
		username: string;
		name: string;
		password: string;
		passwordConfirm: string;
	};
};

export type commentType = {
	id: string;
	comment: string;
	expand: {
		user : {
			name: string;
			username: string;
		}
	}
};
