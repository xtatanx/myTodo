var app = window.app || {};

(function (app) {
    'use strict';
    app.init = function () {
        this.router = new app.Router();
        Backbone.history.start({pushState: true});
    };

    $(document).ready(function () {
        app.init();
    });

}(app));

