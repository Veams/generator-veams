/**
 * Execute Mangony build process to generate HTML files.
 *
 * @author Sebastian Fitzner
 */
'use strict';

/**
 * Dependencies
 */
const Mangony = require('mangony');
const mangonyConfig = require('./mangony.config');

/**
 * Merge default options with dist options.
 */
const options = Object.assign(mangonyConfig.dist.options, mangonyConfig.options);

/**
 * Initialize Mangony instance.
 */
const mangony = new Mangony(options);

/**
 * Generate HTML files.
 */
mangony.render();