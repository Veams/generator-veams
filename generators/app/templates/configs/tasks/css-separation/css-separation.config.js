module.exports = {
	pattern: {
		matchValue: /data:/, // The RegExp to match values with
		matchProp: false, // The RegExp to match rules with
		matchRule: false, // The RegExp to match rules with
		matchMedia: false, // The RegExp to match media queries with
		matchAtRuleType: false, // The RegExp to match media queries with
		matchParent: true // Rules (eg. @media) include their parent node.
	}
};