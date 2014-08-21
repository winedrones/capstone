var Backbone = require('backbone');
Backbone.$ = $;

var MainView = require('./views/main-view');

var Router = Backbone.Router.extend({
  routes: {
    '': 'main',
    'wantlist/:id' : 'wantlist',
    'collections/:id' : 'collections'
  },
  	main: function () {
    this.mainView = new MainView();
    //this.mainView.render(); 
  },
    wantlist: function (id) {
    //this.mainView = new MainView({list:"wantlist",page:id});
    this.mainView.wants(this.mainView.userName, id); 
  },
    collections: function (id) {
    //this.mainView = new MainView({list:"collection",page:id});
    this.mainView.discollection(this.mainView.userName, id); 
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
});