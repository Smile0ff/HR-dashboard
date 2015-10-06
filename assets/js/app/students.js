"use strict";

import $ from "jquery";
import validate from "jquery-validation";
import mask from "jquery-mask-plugin";
import tabby from "tabby";
import selectify from "selectify";
import Menu from "../controllers/menu";
import Confirm from "../controllers/confirm";

window.$ = $;

$(function(){

	new Menu();
	new Confirm();

	$(".tabs-holder").tabby();
	$(".select-holder").selectify();
	$("form").validate();
});