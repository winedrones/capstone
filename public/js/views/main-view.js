var $ = require('jquery');
var Backbone = require('backbone');
var http = require('http');
var url = require('url');
var discogs = require('discogs');
var request = require('request');
Backbone.$ = $;

var htmlTemplate = require('../../templates/main.hbs');

var MainView = Backbone.View.extend({
  el: '#my-app',
  initialize: function () {

  },
  render: function () {
    $(this.el).html(htmlTemplate);
  }

});


/*var MainView = Backbone.View.extend({
  el: '#my-app',
  initialize: function () {
  },
  render: function (user) {
  	$(this.el).html(htmlTemplate);
  	var wantList = {}; // this gets filled with the full discogs JSON wantlist data
	var pages = 1; //need to implement pagination later
	var currentPage = 1;
	var client = discogs({api_key: 'foo4711'});  //that api key came from the discogs node module. need to replace.


	var getIds = function(callback){
	records = [];
	client.get('/users/'+user+'/wants?page='+currentPage, function(err, data) {
		var wantArr = [];
	    wantList = data;  // this is the full discogs JSON wantlist data
	    pages = wantList.pagination.pages;
	    wantList.wants.forEach(function (item, index){ //this grabs the discogs id of every release in the discogs wantlist
	    	wantArr.push(item.id);
	    	});
	     callback(wantArr);
	});
}

	var getVids = function(arr){
		arr.forEach(function (item, index){
			client.get('/releases/'+item, function(err, vids) { //this grabs the youtube link from the releases part of the discogs db api    		)
    		if (vids){
    		records.push({youtube:vids.videos[0].uri.slice(-11), discogs:item}); //this adds objects for everything fetched from discogs to the records array
    		}
    		//var template = Handlebars.compile(htmlTemplate); //probably doing this wrong.. not working. maybe template file is the prob..
    		
    		console.log(records); 
		});		
	});
};


getIds(getVids);

    


  }

});*/

module.exports = MainView;
