module.exports = {
	files: [
		"!<%= paths.src %>/js/vendor/**/*.js",
		"<%= paths.src %>/js/**/*.js",
		"<%= paths.dev %>/**/*.html"
	],
	options: {
		config: "<%= paths.helper %>/configs/.jsbeautifierrc",
		html: {
			braceStyle: "collapse",
			indentChar: " ",
			indentScripts: "keep",
			indentSize: 4,
			maxPreserveNewlines: 10,
			preserveNewlines: true,
			unformatted: ["a", "sub", "sup", "b", "i", "u", "pre", "code"],
			wrapLineLength: 0
		}
	}
};