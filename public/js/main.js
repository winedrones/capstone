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
    this.MainView.render(); 
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
});