var app = app || {};

$(function(){

	$("#content-scroll-holder").perfectScrollbar({
		maxScrollbarLength: 40
	});

	new app.MenuController();

});