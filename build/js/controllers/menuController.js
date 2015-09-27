var app = app || {};

(function(app, $, root){

	"use strict";

	function MenuController(){
		this.el = $("#page");
		this.initialize.apply(this, arguments);
	}
	MenuController.prototype = {
		button: [],
		initialize: initialize,
		_events: _events,
		handleMenu: handleMenu
	}
	function initialize(){
		this.button = $("#toggle-menu-loader > .menu-button");
		this._events();
	}
	function _events(){
		this.button.on("click", $.proxy(this.handleMenu, this));
	}
	function handleMenu(e){
		this.el.toggleClass("menu-active");
		return false;
	}

	app.MenuController = MenuController;

})(app, jQuery, window);