module.exports = {
    options : {
        accessibilityLevel: 'WCAG2A'
    },
    test : {
        files: [{
            expand  : true,
            cwd     : '<% paths.dist %>/',
            src     : ['*.html'],
            dest    : '<% paths.helper %>/reports/',
            ext     : '-report.txt'
        }]
    }
}