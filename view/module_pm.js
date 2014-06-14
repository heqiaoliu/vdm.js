/**
 *
 *
 */
var FileExplore=(function($){
	/**
	 * Private properties.
	 */
	var container=
	{
		body:null,
		buttons:null
	},
	FE=
	{
		BACTERIA:"<span>{{bact.%BACT-NAME%}}</span>",
		PLATE:"<span>{{plate.%PLATE-NAME%}}</span>",
		EXP:"<span>{{plate.%EXP-NAME%}}</span>"
	}
	,
	init=function(){

	};
	
	/**
	 * jQuery properties.
	 * 
	 */
	$.fn.FileExplore=function(){
		container.body=this;
	}

	/**
	 * public functions.
	 */
	return {

	}
})(jQuery)
