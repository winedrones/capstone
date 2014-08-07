var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var MainView = require('./views/main-view');

var Router = Backbone.Router.extend({
  routes: {
    '': 'main'
  },
  main: function () {
    this.MainView = new MainView();
    this.MainView.render(); //passes username to discogs functions in main-view.js
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
});