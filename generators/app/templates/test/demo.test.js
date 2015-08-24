function addDivWithClassTest(appender) {

	var div = document.createElement('div');
	div.setAttribute('class', 'test');

	appender.appendChild(div);
}