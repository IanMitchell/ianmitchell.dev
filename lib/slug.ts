// All because of Pokémon. #Worth
function stripAccents(str: string) {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function sanitize(str: string) {
	return stripAccents(str.toLowerCase())
		.trim()
		.replace(/[^a-z0-9 -]/g, "") // remove invalid chars
		.replace(/\s+/g, "-") // collapse whitespace and replace by -
		.replace(/-+/g, "-"); // collapse dashes
}

export function getSlug(path: string) {
	return sanitize(path.replace(/\d{4}-\d{2}-\d{2}-/i, "").replace(".md", ""));
}
