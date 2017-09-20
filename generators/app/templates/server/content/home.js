const config = require('../configs/config');

export default (req, res) => {
	res.redirect(config.startPath);
};