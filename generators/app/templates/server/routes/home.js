const config = require('../configs/config');

export default (req, res, next) => {
	res.redirect(`/${config.startPath}`);
};