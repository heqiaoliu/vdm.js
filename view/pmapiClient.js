var pmapiClient=(function($){
	/**
	 * Private properties.
	 */
	var PMAPIURL="//localhost/vdm.js/test/pmapi-emu.php",//need to be rewrite.
	API_QUERY_GETBACTERIALIST="type=getBacteriaList&param=null&mid=%MID%",
	API_QUERY_GETBACTERIA="type=getBacteria&param=%PARAM%&mid=%MID%";
	API_QUERY_GETEXPERIMENT="type=getExperiment&param=%PARAM%&mid=%MID%";
	API_QUERY_GETPLATE="type=getPlate&param=%PARAM%&mid=%MID%";
	API_QUERY_GETGROWTH="type=getGrowth&param=%PARAM%&mid=%MID%";

	/**
	 * Add methods to String properties.
	 */
	String.prototype.setParam=function(paramStr){
		return this.replace("%PARAM%",paramStr); 
	}

	String.prototype.setMid=function(mid){
		return this.replace("%MID%",mid);
	}

	/**
	 * Private functions.
	 */
	function getFromPmapi(query,callback){
		$.ajax({
			url:PMAPIURL,
			type:"post",
			data:query,
			dataType:"json",
			success:callback
		});
	}

	function test(dataobj){
		console.log(dataobj);
	}

	return {
		init:function(url){
			PMAPIURL=url;
		},
		getBacteriaList:function(mid,callback){
			getFromPmapi(API_QUERY_GETBACTERIALIST.setMid(mid),callback);
		},
		getBacteria:function(mid,param,callback){
			getFromPmapi(API_QUERY_GETBACTERIA.setMid(mid).setParam(param),test,callback);
		},
		getExperiment:function(mid,param,callback){
			getFromPmapi(API_QUERY_GETEXPERIMENT.setMid(mid).setParam(param),test,callback);
		},
		getPlate:function(mid,param,callback){
			getFromPmapi(API_QUERY_GETPLATE.setMid(mid).setParam(param),test,callback);
		},
		getGrowth:function(mid,param,callback){
			getFromPmapi(API_QUERY_GETGROWTH.setMid(mid).setParam(param),test,callback);
		}
	}
})(jQuery);

