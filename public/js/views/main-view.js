var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var MainTemplate = require('../../templates/main.hbs');


var MainView = Backbone.View.extend({
  el: '#my-app',
  initialize: function () {
  },
  render: function () {
    $(this.el).html(MainTemplate);
  }

});

module.exports = MainView;
