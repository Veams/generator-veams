(function () {
    module.exports.register = function (Handlebars, options) {

        /*
         * Loop helper.
         *
         * @return an easy for loop
         */
        Handlebars.registerHelper('times', function (n, block) {
            var accum = '';
            for (var i = 0; i < n; ++i)
                accum += block.fn(i);
            return accum;
        });

    };
}).call(this);
