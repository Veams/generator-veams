module.exports = function (faker, idx) {
	return {
		"id": idx,
		"mail": faker.internet.email(),
		"firstName": faker.name.firstName(),
		"lastName": faker.name.lastName()
	}
};