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
			this.el.on("click", ".tab-label", $.proxy(this.handleTab, this));
		}
		handleTab(e){
			var target = $(e.target).closest(".tab-label"),
				parent = target.closest(".tabs-holder"),
				tabIndex  = target.index();

			target.addClass("active").siblings(".tab-label").removeClass("active");
			parent.find(".tab-content").eq(tabIndex).addClass("active").siblings(".tab-content").removeClass("active");

			return false;
		}
	}

	$.fn.tabby = function(options){
		return this.each(function(){
			if(!$.data(this, "plugin-Tabby")){
				$.data(this, "plugin-Tabby", new Plugin(this, options));
			}
		});
	}

})($, window);