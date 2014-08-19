var Backbone = require('backbone');
var http = require('http');
var url = require('url');
var request = require('request');

Backbone.$ = $;

var htmlTemplate = require('../../templates/main.hbs');
var loginHTML = require('../../templates/login.hbs');




var MainView = Backbone.View.extend({
  el: '#my-app',

  events: {
    'click #username-submit': 'addUsername',
    'click #wantlist' : 'renderWants',
    'click #collection' : 'renderCollection',
    'click #init-username-submit' : 'authenticate'
  },

  renderPage: function(list, page){
    if (list == wants){
      this.renderWants(page);
    }
    if (list == collection){
      this.renderCollection(page);
    }
  },


  addUsername: function () {
    var $usernameInput = $('.form-group').find('#add-username');
    this.records = {wants:[], collection:[]};
    this.userName = $usernameInput.val();
    this.discogs(this.userName, 1);
    this.records.wants.username = this.userName;
    this.records.collection.username = this.userName;
},

  records: {wants:[], collection:[]},

  //testThing: {wants:[{discogs: 5719574, youtube: "QLnTRwpmCGs"}, {discogs: 4368235, youtube: "zH1VeQFBfW8"}]},

  authenticate: function() {
      var self = this;
      var $user = $('.login-form').find('#username');
      this.userName = $user.val();
      $.getJSON('http://api.discogs.com/users/'+this.userName+'/wants?page=1&callback=?')
        .done(function(data){
          console.log("success");
          if (data.meta.status == 200){
            self.discogs(self.userName, 1);
            self.records.wants.username = self.userName;
            self.records.collection.username = self.userName;
          }
        }).fail(function() {
          console.log("discogs username failed");
        });
  },

  initialize: function () {

  $(this.el).html(loginHTML());

  },

  discogs: function(user, page){
    this.records.wants = [];
    this.records.wantPages=[];
    var self = this;
  	var wantList = {};
  	var pages = 1;
    var wantArr = [];
    var animationHtml = "<div class='spinner'></div><div>Please wait while we grab a bunch of jams...</div>";
    $("#youtube-vids").replaceWith(animationHtml); //loading status thing

    var getIds = function(callback, page){ //gets every release id in users wantlist and passes as an array to getVids function

      $.getJSON('http://api.discogs.com/users/'+user+'/wants?page='+page+'&callback=?')
        .done(function(data){ //this returns JSONP handled in a callback. Need to traverse an extra data. property to get to the stuff we care about
          console.log(data);
          wantList = data; 
          pages = wantList.data.pagination.pages;
          wantList.data.wants.forEach(function (item, index){ //this grabs the discogs id of every release in the discogs wantlist
            wantArr.push(item.id);
          });
          for (var i = 0; i<pages; i++){ //fills the pages array with the api returned pagination numbers
            self.records.wantPages.push(i+1);
            //self.events["click #page"+i+1] = "self.discogs(user,i+1)";
          };
            callback(wantArr);
  	       
  	    }).fail(function() {
          console.log( "get page "+page+" of "+user+"'s wantlist from discogs failed" );
        });
    };

  	var getVids = function(arr){  //grabs youtube video per release in wantArr from getIds fn
  		arr.forEach(function (item, index){
  			$.getJSON('http://api.discogs.com/releases/'+item+'?callback=?').done(function(rels){
      		if (rels.data.videos){
      		self.records.wants.push({youtube:rels.data.videos[0].uri.slice(-11), discogs:item, artist:rels.data.artists[0].name, title:rels.data.title}); //this adds objects for everything fetched from discogs to the records array
         }
         if (index == arr.length-1){
         self.render({array:self.records.wants, pages:self.records.wantPages});
         }
  		});	
  	});
  };


	getIds(getVids, page);
  },

  discollection: function(user, page){
    this.records.collection = [];
    this.records.colPages=[];
    var self = this;
    var list = {};
    var pages = 1;
    var colArr = [];
    var animationHtml = "<div class='spinner'></div><div>Please wait while we grab a bunch of jams...</div>";
    $("#youtube-vids").replaceWith(animationHtml); //loading status thing

  var getIds = function(callback, page){//gets every release id in users all collections folder and passes as an array to getVids function
  $.getJSON('http://api.discogs.com/users/'+user+'/collection/folders/0/releases?page='+page+'&callback=?').done(function(data){ //this returns JSONP handled in a callback. Need to traverse an extra data. property to get to the stuff we care about
    var nextPage = page+1;
      list = data; 
      pages = list.data.pagination.pages;
      list.data.releases.forEach(function (item, index){ //this grabs the discogs id of every release in the discogs wantlist
        colArr.push(item.id);
        });
        for (var i = 0; i<pages; i++){ //fills the pages array with the api returned pagination numbers
        self.records.colPages.push(i+1);
        };
       callback(colArr);
  });
};

  var getVids = function(arr){  //grabs youtube video per release in wantArr from getIds fn
    arr.forEach(function (item, index){
      $.getJSON('http://api.discogs.com/releases/'+item+'?callback=?').done(function(rels){
        if (rels.data.videos){
        self.records.collection.push({youtube:rels.data.videos[0].uri.slice(-11), discogs:item, artist:rels.data.artists[0].name, title:rels.data.title}); //this adds objects for everything fetched from discogs to the records array
       }
       if (index == arr.length-1){
       self.render({array:self.records.collection, pages:self.records.colPages});
       }
    }); 
  });
};


  getIds(getVids, page);
  },
    

  render: function (template) {
    $(this.el).html(htmlTemplate(template));
    $('.js-lazyYT').lazyYT(); 
    console.log("viewing "+this.records.wants.username+"'s selections");
   // $(this.el).html(myTemplate({entries:[{youtube: data, discogs: data},{...}]}))
  }

});


module.exports = MainView;
