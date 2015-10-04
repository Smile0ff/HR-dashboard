(function($, root){

	"use strict";

	var pluginName = "tabby",
		_defaults = {};

	function Plugin(el, options){
		this.el = $(el);
		this._options = $.extend({}, _defaults, options);

		this.initialize.apply(this, arguments);
	}
	Plugin.prototype = {
		initialize: initialize,
		_events: _events
	}

	function initialize(){
		console.log(this);
	}
	function _events(){

	}

	$.fn[pluginName] = function(options){
		return this.each(function(){
			if(!$.data(this, "plugin-" + pluginName)){
				$.data(this, "plugin-" + pluginName, new Plugin(this, options));
			}
		});
	}

})(jQuery, window);