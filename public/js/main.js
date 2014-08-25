var Backbone = require('backbone');
Backbone.$ = $;

var MainView = require('./views/main-view');

var Router = Backbone.Router.extend({
  routes: {
    '': 'main',
    ':user/wants/:page' : 'wantlist',
    ':user/collection/:page' : 'collection'
  },
  	main: function () {
    this.mainView = new MainView({user:undefined, list:"wants",page:1});
    this.mainView.login({user:undefined, list:"wants",page:1}); 
  },
    wantlist: function (user, page) {
    this.mainView = new MainView({user:user, list:"wants",page:page});
    this.mainView.discogs(this.mainView.userName, this.mainView.currentList, this.mainView.currentPage);
    //this.mainView.discgs(user, "wants", page); 

  },
    collection: function (user, page) {
    this.mainView = new MainView({user: user, list:"collection",page:page});
    this.mainView.discogs(this.mainView.userName, this.mainView.currentList, this.mainView.currentPage);
  }
});

$(function () {
  window.app = new Router();
  Backbone.history.start();
});