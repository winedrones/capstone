var Backbone = require('backbone');
Backbone.$ = $;

var MainView = require('./views/main-view');

var Router = Backbone.Router.extend({
  routes: {
    '': 'main'
  },
  main: function () {
    this.mainView = new MainView();
    //this.mainView.render(); 
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
});