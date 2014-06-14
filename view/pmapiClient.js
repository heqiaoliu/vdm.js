var pmapiClient=(function($){
	/**
	 * Private properties.
	 */
	var PMAPIURL="http://vdm.sdsu.edu/data/api/pmapi.php",
	API_QUERY_GETBACTERIALIST="type=getBacteriaList&mid=%MID%",
	API_QUERY_GETBACTERIAS="type=getBacterias&param=%PARAM%&mid=%MID%";

	/**
	 * Add methods to String properties.
	 */
	String.prototype.setParam=function(paramStr){
		this.replace("%PARAM%",paramStr); 
	}

	String.prototype.setMid=function(mid){
		this.replace("%MID%",mid);
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
		getBacteriaList:function(mid){
			getFromPmapi(API_QUERY_GETBACTERIALIST.setMid(mid),test);
		}
	}
})(jQuery);


pmapiClient.getBacteriaList("0");
