var $ = require('jquery');
var Backbone = require('backbone');
var http = require('http');
//var url = require('url');
//var discogs = require('discogs');
var request = require('request');

Backbone.$ = $;

var htmlTemplate = require('../../templates/main.hbs');



var MainView = Backbone.View.extend({
  el: '#my-app',

  events: {
    'click #username-submit': 'addUsername'
  },

  addUsername: function () {
    var $usernameInput = $('.form-group').find('#add-username');
    this.records = {wants:[], collection:[]};
    var userName = $usernameInput.val();
    this.discogs(userName);
    this.discollection(userName);
},

  records: {wants:[{youtube:'MI0GJj_NoI0', discogs:'1503102'}], collection:[{youtube:'MI0GJj_NoI0', discogs:'1503102'}]},

  //testThing: {entries:[{discogs: 5719574, youtube: "QLnTRwpmCGs"}, {discogs: 4368235, youtube: "zH1VeQFBfW8"}]},

  initialize: function () {
  },

  discogs: function(user){
    var self = this;
  	var wantList = {};
  	var pages = 1; //need to implement pagination later
	  var currentPage = 1;


	var getIds = function(callback){ //gets every release id in users wantlist and passes as an array to getVids function
	$.getJSON('http://api.discogs.com/users/jmejia/wants?page=1&callback=?').done(function(data){ //this returns JSONP handled in a callback. Need to traverse an extra data. property to get to the stuff we care about
     console.log(data);
      var wantArr = [];
	    wantList = data; 
	    pages = wantList.data.pagination.pages;
	    wantList.data.wants.forEach(function (item, index){ //this grabs the discogs id of every release in the discogs wantlist
	    	wantArr.push(item.id);
	    	});
	     callback(wantArr);
	}).fail(function() {
console.log( "get page "+currentPage+" of "+user+"'s wantlist from discogs failed" );
});
}

	var getVids = function(arr){  //grabs youtube video per release in wantArr from getIds fn
		arr.forEach(function (item, index){
			$.getJSON('http://api.discogs.com/releases/'+item+'?callback=?').done(function(vids){
    		if (vids.data.videos){
    		self.records.wants.push({youtube:vids.data.videos[0].uri.slice(-11), discogs:item}); //this adds objects for everything fetched from discogs to the records array
       };
       if (index == arr.length-1){
       self.render();
       }
		});	
	});
};


	getIds(getVids);
  },

  discollection: function(user){

    var self = this;
    var list = {};
    var pages = 1; //need to implement pagination later
  var currentPage = 1;


  var getIds = function(callback){//gets every release id in users all collections folder and passes as an array to getVids function
  $.getJSON('http://api.discogs.com/users/'+user+'/collection/folders/0/releases?page='+currentPage+'&callback=?').done(function(data){ //this returns JSONP handled in a callback. Need to traverse an extra data. property to get to the stuff we care about
    var colArr = [];
      list = data; 
      pages = list.data.pagination.pages;
      list.data.releases.forEach(function (item, index){ //this grabs the discogs id of every release in the discogs wantlist
        colArr.push(item.id);
        });
       callback(colArr);
  });
}

  var getVids = function(arr){  //grabs youtube video per release in wantArr from getIds fn
    arr.forEach(function (item, index){
      $.getJSON('http://api.discogs.com/releases/'+item+'?callback=?').done(function(vids){
        if (vids.data.videos){
        self.records.collection.push({youtube:vids.data.videos[0].uri.slice(-11), discogs:item}); //this adds objects for everything fetched from discogs to the records array
       };
       if (index == arr.length-1){
       self.render();
       }
    }); 
  });
};


  getIds(getVids);
  },
    

  render: function () {
    $(this.el).html(htmlTemplate(this.records));

   // $(this.el).html(myTemplate({entries:[{youtube: data, discogs: data},{...}]}))
  }

});


module.exports = MainView;
