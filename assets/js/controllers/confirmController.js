var app = app || {};

(function(app, $, root){

	"use strict";

	function ConfirmController(){
		this.el = $("#confirm-holder");
		this.initialize.apply(this, arguments);
	}
	ConfirmController.prototype = {
		buttons: [],
		url: "",
		initialize: initialize,
		_events: _events,
		handleButton: handleButton,
		handleDelete: handleDelete,
		handleClose: handleClose
	}

	function initialize(){
		this.buttons = $(".delete-button");
		this._events();
	}
	function _events(){
		this.buttons.on("click", $.proxy(this.handleButton, this));
		this.el.on("click", ".confirm-button", $.proxy(this.handleDelete, this))
				.on("click", $.proxy(this.handleClose, this));
	}
	function handleButton(e){
		this.url = $(e.target).attr("href");

		this.el.addClass("active");
		return false;
	}
	function handleDelete(e){
		var target = $(e.target).closest(".confirm-button");

		target.data("confirm") ? root.location.href = this.url : this.el.removeClass("active");
		this.url = "";

		return false;
	}
	function handleClose(e){
		if($(e.target).closest(".inner").length <= 0) this.el.removeClass("active");
		return false;
	}

	app.ConfirmController = ConfirmController;

})(app, jQuery, window);