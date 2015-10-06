(($, root) => {

	"use strict";

	var _defaults = {};

	class Plugin{
		constructor(el, options){
			this.el = $(el);
			this._options = $.extend({}, _defaults, options);

			this.initalize.apply(this, arguments);
		}
		
		initalize(){
			this._events();
		}
		_events(){
			this.el
				.on("click", ".btn-select", $.proxy(this.openList, this))
				.on("click", ".select-list", $.proxy(this.closeList, this))
				.on("click", ".option-item", $.proxy(this.handleOption, this));
		}
		openList(e){
			this.el.find(".select-list").addClass("active");
			return false;
		}
		handleOption(e){
			var	btnSelect = this.el.find(".btn-select"),
				hdnInput = this.el.find("input[type=hidden]"),
				target = $(e.target).closest(".option-item"),
				optionID = parseInt(target.data("option")),
				optionName = target.find(".option-name").text();

			if(isNaN(optionID)) return;
			hdnInput.val(optionID);
			btnSelect.find(".text").text(optionName);
			target.addClass("active").siblings(".option-item").removeClass("active");
			this.closeList();

			return false;
		}
		closeList(e){
			this.el.find(".select-list").removeClass("active");
		}
		
	}

	$.fn.selectify = function(options){
		return this.each(function(){
			if(!$.data(this, "plugin-Selectify")){
				$.data(this, "plugin-Selectify", new Plugin(this, options));
			}
		});
	}

})($, window);