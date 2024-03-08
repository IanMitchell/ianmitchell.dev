// All because of Pokémon. #Worth
function stripAccents(str: string) {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function slug(str: string) {
	return stripAccents(str.toLowerCase())
		.trim()
		.replace(/[^a-z0-9 -]/g, "") // remove invalid chars
		.replace(/\s+/g, "-") // collapse whitespace and replace by -
		.replace(/-+/g, "-"); // collapse dashes
}
