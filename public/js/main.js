var Backbone = require('backbone');
Backbone.$ = $;

var MainView = require('./views/main-view');

var Router = Backbone.Router.extend({
  routes: {
    '': 'main',
    ':user/wantlist/:page' : 'wantlist',
    ':user/collection/:page' : 'collection'
  },
  	main: function () {
    this.mainView = new MainView({user:undefined, list:"wantlist",page:1});
    this.mainView.login({user:undefined, list:"wantlist",page:1}); 
  },
    wantlist: function (user, page) {
    this.mainView = new MainView({user:user, list:"wantlist",page:page});
    this.mainView.discogs(this.mainView.userName, "wantlist", this.mainView.currentPage);
    //this.mainView.discgs(user, "wants", page); 

  },
    collection: function (user, page) {
    this.mainView = new MainView({user: user, list:"collection",page:page});
    this.mainView.discogs(this.mainView.userName, "collection", this.mainView.currentPage);
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
});