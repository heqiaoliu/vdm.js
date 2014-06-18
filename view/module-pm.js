/**
 *
 *
 */
var FileExplore=(function($){
	/**
	 * Private properties.
	 */
	$container=
	{
		body:null,
		bacteria:null
		
	},
	// The object to store received data from api.
	buffer=
	{
		bacteria:{},
		experiment:{}
	},
	//HTML template strings.
	template=
	{
		BLANK:"<%TYPE% class='%CLASS%'>%NAME%</%TYPE%>",
		bacteria:"<div>%NAME%</div>"
	};

	String.prototype.setName=function(name){
		return this.replace("%NAME%",name);
	}
	
	function appendBacteria(dataobj){
		if (dataobj.success=="False")
			return;
		var data=dataobj.data;
		for (var x in data){
			var temp=data[x].bacteria_external_id;
			buffer.bacteria[temp]=data[x];
			$container.body.append(template.bacteria.setName(temp));
		}
		$container.bacteria=$container.body.children();
	}

	function appendExperiment(dataobj){
	
	}
	
	/**
	 * jQuery properties.
	 * 
	 */

	/**
	 * public functions.
	 */
	return {
		init: function(elem){
			$container.body=$(elem);
			pmapiClient.getBacteriaList("0",appendBacteria);
		}
	}
})(jQuery);
