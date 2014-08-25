var Backbone = require('backbone');
Backbone.$ = $;
var DiscogsUsers = require('./collections/discogsUsers')
var MainView = require('./views/main-view');

var Router = Backbone.Router.extend({
  routes: {
    '': 'main'
  },
  main: function () {
  	this.usersCollection = new DiscogsUsers();
    this.mainView = new MainView({collection:this.usersCollection});

    //this.mainView.render(); 
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
});