(function () {
	var el = document.getElementById('toggle');

	el.addEventListener("click", function (e) {
		var wrapper = document.getElementById('site-wrapper');

		e.preventDefault();

		if (wrapper.classList) {
			wrapper.classList.toggle('show-nav');
		} else {
			var classes = wrapper.className.split(' ');
			var existingIndex = classes.indexOf('show-nav');

			if (existingIndex >= 0)
				classes.splice(existingIndex, 1);
			else
				classes.push(className);

			wrapper.className = classes.join(' ');
		}

	}, false);
})();