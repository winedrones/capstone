var Backbone = require('backbone');
Backbone.$ = $;
var DiscogsUsers = require('./collections/discogsUsers')
//added this:
var usersCollection = new DiscogsUsers();

var MainView = require('./views/main-view');

var Router = Backbone.Router.extend({
  routes: {
    '': 'main',
    ':user/wants/:page' : 'wantlist',
    ':user/collection/:page' : 'collection'
  },

  main: function () {
  	// this.usersCollection = new DiscogsUsers();
    this.mainView = new MainView({user:undefined, list:"wants",page:1, collection: usersCollection});
    //this.mainView.render(); 

  },
    wantlist: function (user, page) {
    this.mainView = new MainView({user:user, list:"wants",page:page, collection: usersCollection});
    //this.mainView.discgs(user, "wants", page); 

  },
    collection: function (user, page) {
    this.mainView = new MainView({user: user, list:"collection",page:page, collection: usersCollection});
    //this.mainView.discollection(user, "wants", page); 
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
});