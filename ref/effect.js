/*
 * @const
 */
var SELECTED="selected";
var ACTIVE="active";
$.fn.toggleSelected=function(){
	return $(this).toggleClass(SELECTED);
}

$.fn.activeSingleTag=function(){
	$(this).siblings().removeClass(ACTIVE);
	$(this).addClass(ACTIVE);
	return $(this);
}
