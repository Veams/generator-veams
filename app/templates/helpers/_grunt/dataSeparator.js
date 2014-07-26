module.exports = {
	icons: {
		options: {
			pattern: {
				matchValue: /data/, // The RegExp to match values with
				matchRule: false, // The RegExp to match rules with
				matchParent: true // Rules (eg. in @media blocks) include their parent node.
			},
			output: '<%= paths.dev %>/css/styles.icons.css'
		},
		files: {
			'<%= paths.dev %>/css/styles.css': ['<%= paths.dev %>/css/styles.css']
		}
	}
}