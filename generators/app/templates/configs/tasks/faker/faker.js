/**
 * This task is responsible to generate mock data.
 * It uses presets to generate these.
 */
const fs = require('fs-extra');
const faker = require('faker');
const chalk = require('chalk');
const veamsConfig = require('../../../veams-cli.json');
const args = process.argv.splice(2);
const writtenFiles = [];
let generateNum = 10;
let contentTemplate = () => {};

faker.locale = 'de';

if(args.length === 0) {
	console.log('You have to provide a preset file, which is saved under "configs/tasks/faker/presets"!');
	return;
}

contentTemplate = require(`${__dirname}/presets/${args[0]}.preset`);
generateNum = args[1] ? args[1] : generateNum;


for (let i = 1; i <= generateNum; i++) {
	writtenFiles.push(fs.outputFile(`${process.cwd()}/${veamsConfig.paths.mocks}/${args[0]}/${i}.json`, JSON.stringify(contentTemplate(faker, i), null, 4)));
}

/**
 * After all files are written to the file system,
 * display success message.
 */
Promise.all(writtenFiles)
	.then(() => console.log(chalk.green(`Fake data is generated and saved into ` + chalk.cyan(`${veamsConfig.paths.mocks}/${args[0]}/`) + `!`)))
	.catch(err => console.error(chalk.red('Error in fake data generation :: Files cannot be written:\n', err)));
