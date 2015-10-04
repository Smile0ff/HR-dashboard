"use strict";

import jQuery from "jquery";
import { Menu } from "../controllers/menu";
import { Confirm } from "../controllers/confirm";

window.$ = window.jQuery = jQuery;

$(function(){

	new Menu;
	new Confirm;

	$(".tabs-holder").tabby();

});