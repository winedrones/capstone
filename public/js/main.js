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
    this.mainView = new MainView({user:undefined, list:"wantlist",page:1, collection: users});
    this.mainView.login({user:undefined, list:"wantlist",page:1}); 
  },
    wantlist: function (user, page) {
    this.mainView = new MainView({user:user, list:"wantlist",page:page, collection: users});
    this.mainView.discogs(this.mainView.userName, "wantlist", this.mainView.currentPage);
    //this.mainView.discgs(user, "wants", page); 

  },
    collection: function (user, page) {
    this.mainView = new MainView({user: user, list:"collection",page:page, collection: users});
    this.mainView.discogs(this.mainView.userName, "collection", this.mainView.currentPage);
  }
});

var User = Backbone.Model.extend({
  validate: function (attrs) {
    if (attrs.title.length < 1) {
      alert("no title provided");
      return "no title provided";
    }
    if (attrs.description.length < 1) {
      alert("no title provided");
      return "no description provided";  // need to return something for validation to stop bad inputs
                                        // don't return anything when things are good
    }
  }
});

var Users = Backbone.Collection.extend({
  model: User,
  url: '/api/users',
  comparator: 'creationDate'
});

var users = new Users();


$(function () {
  window.app = new Router();
  Backbone.history.start();
});