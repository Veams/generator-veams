'use strict';

var chalk = require('chalk');

/**
 * Helper utilities
 */
var pgHelpers = module.exports;

pgHelpers.welcome = chalk.cyan('\n               \'coxOOOOkdl;.             ') +
chalk.cyan('\n           ,lkKXXXXXXXXXXXXXOd;.         ') +
chalk.cyan('\n        \'dKXXXXXXX0OOOO0KXXXXXXXk:       ') +
chalk.cyan('\n      ;OXXXXKkl,.        .\'cd0XXXX0l.    ') +
chalk.cyan('\n    .kXXXX0c.                 ,kXXXX0;   ') +
chalk.cyan('\n   ,KXXX0:                      \'kXXXXo  ') + chalk.cyan('*  http://prototype-generator.com *') +
chalk.cyan('\n  \'KXXXO.                         oXXXXo ') +
chalk.cyan('\n  OXXX0.                           dXXXX,') +
chalk.cyan('\n :XXXX:                            .KXXXx') + chalk.yellow('    Welcome ladies and gentlemen!') +
chalk.cyan('\n dXXXK.  .::::::::::::::::::.       dXXXK') + chalk.yellow('    Want to make your life easy???') +
chalk.cyan('\n dXXXK   ,XXXXXXXXXXXXXXXXXX\'       oXXXX') +
chalk.cyan('\n dXXXK   ,XXXXXKKKKKKKKKKKKX\'       OXXXO') + chalk.red('    Be sure you have installed') +
chalk.cyan('\n dXXXK   ,XXXXd                    ;XXXXl') + chalk.red('     * bower:  http://bower.io/') +
chalk.cyan('\n dXXXK   ,XXXXd                   \'KXXXO ') + chalk.red('     * grunt:  http://gruntjs.com ') +
chalk.cyan('\n dXXXK   ,XXXXd                  cKXXXO. ') +
chalk.cyan('\n dXXXK   ,XXXXd                :OXXXXx.  ') +
chalk.cyan('\n dXXXK   ,XXXXx            .;dKXXXXO;    ') +
chalk.cyan('\n dXXXK   ,XXXXX0xoc:;;:clxOXXXXXXO:      ') +
chalk.cyan('\n dXXXK    ;dOXXXXXXXXXXXXXXXXKxc.        ') +
chalk.cyan('\n dXXXK       .,:ldkOOOOkxoc;.            ') +
chalk.cyan('\n lOOOx                                   ') +
('\n ');

pgHelpers.cleanupPath = function (path) {
	if (path !== '') {
		return path.replace(/\/?$/, '/');
	}
};