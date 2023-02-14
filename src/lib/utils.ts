export const validateData = async (formData: FormData, zodSchema: any) => {
	const body = Object.fromEntries(formData);

	try {
		const data = zodSchema.parse(body);
		return {
			formData: data,
			errors: null
		};
	} catch (err) {
		console.error('Error : ', err);
		const errors = err.flatten();

		return {
			formData: body,
			errors: errors
		};
	}
};

export const slugify = (str: string) => {
	str = str.replace(/^\s+|\s+$/g, '');

	// Make the string lowercase
	str = str.toLowerCase();

	// Remove accents, swap ñ for n, etc
	const from =
		'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;';
	const to =
		'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------';
	for (let i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	// Remove invalid chars
	str = str
		.replace(/[^a-z0-9 -]/g, '')
		// Collapse whitespace and replace by -
		.replace(/\s+/g, '-')
		// Collapse dashes
		.replace(/-+/g, '-');

	return str;
};

export const cleanDescription = (str: string) => {

	// Remove invalid chars
	str = str
		.replace(/[^a-zA-Z0-9 .()$:,+!?=@&'"-]/g, '')

	return str;
};