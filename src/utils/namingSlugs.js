const namingBlogSlug = (title) => {
	return title
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/ /g, "-")
		.replace(/\?/g, "")
		.replace(/!/g, "")
		.replace(/\./g, "")
		.replace(/,/g, "")
		.toLowerCase();
};

export default namingBlogSlug;
