"use strict";

import $ from "jquery";
import tabby from "tabby";
import Menu from "../controllers/menu";
import Confirm from "../controllers/confirm";

window.$ = $;

$(function(){

	new Menu();
	new Confirm();

	$(".tabs-holder").tabby();
});