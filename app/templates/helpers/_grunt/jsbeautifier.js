module.exports = {
    html: {
        src: [
            "<%= paths.dist %>/*.html"
        ],
        options: {
            braceStyle: "collapse",
            indentChar: " ",
            indentScripts: "keep",
            indentSize: 4,
            maxPreserveNewlines: 10,
            preserveNewlines: true,
            unformatted: ["a", "sub", "sup", "b", "i", "u"],
            wrapLineLength: 0
        }
    },
    js: {
        src: [
            "<%= paths.src %>/js/**/*.js"
        ],
        options: {
            braceStyle: "collapse",
            breakChainedMethods: false,
            e4x: false,
            evalCode: false,
            indentChar: " ",
            indentLevel: 0,
            indentSize: 4,
            indentWithTabs: true,
            jslintHappy: false,
            keepArrayIndentation: false,
            keepFunctionIndentation: false,
            maxPreserveNewlines: 10,
            preserveNewlines: true,
            spaceBeforeConditional: true,
            spaceInParen: false,
            unescapeStrings: false,
            wrapLineLength: 0
        }
    }
}