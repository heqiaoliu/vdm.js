/**
 * Name: PlotWidgets
 * Initialization an`d Dynamic effects associated with <div id="div-plot-option"/> and <div id="pm-chart"/> 
 * @property maxIcon {String} String template for resizing icon.
 * @property minIcon {String} ..
 * @property plotOption {Object} This is an object contains jQuery selectors of div-plot-option.
 * @property plotContainer {Object}	This is an Object contains jQuery selectors	of pm-chart.
 **/

var plotWidgets={
	// Initialization of PlotWidget Properties.
	init: function(){
		plotWidgets.maxIcon="<i class='icon-fullscreen'></i>", 
		plotWidgets.minIcon="<i class='icon-resize-small'></i>",
		// Name: plotOption
		// @property body {jQuery Element} This is jQuery Element for selector #div-plot-option
		// @property buttons {Object} This is an object contains functional buttons of plotOption
		plotWidgets.plotOption={
			body:$("#div-plot-option"),
			// Name: buttons
			// @property button {jQeruy Element} button of turning on plotOption.
			// @property off {jQuery Element}  button of turning off plotOption.
			// @property chartSwitch {jQuery Element} button of turing on/off chart.
			// @property genGraph PjQuery Element} button to request data due to current selection.
			buttons:{
				button:$("#btn-plot-option"),
				off:$("#close-plot-option"),
				chartSwitch:$("#chart-switch"),
				genGraph:$("#get-pm-curve")
			}
		};

		// Name: plotContainer
		// The div to hold a graph.
		// @property body {jQuery Element} the div it self.
		// @property buttons.resize {jQuery Element} the button to resize the graph container
		// @function resizeIconMax:
		//  change the icon picture of buttons.resize to bootstrap's full screen icon.
		// @function resizeIconMin
		//  change the icon picture of buttons.resize to bootstraps's resize small icon.
		plotWidgets.plotContainer={
			body:$("#pm-chart"),
			buttons:{
				resize:$("#chart-resize")
			},
			resizeIconMax:function(){
				plotWidgets.plotContainer.buttons.resize.html(plotWidgets.maxIcon);
			},
			resizeIconMin:function(){
				plotWidgets.plotContainer.buttons.resize.html(plotWidgets.minIcon);
			}
		};
		plotWidgets.setup();	
	},

	setup: function(){
		//plot widget start as hidden.
		plotWidgets.plotOption.body.hide();
		//plot container start as hidden;
		plotWidgets.plotContainer.body.hide();
		//click 
		plotWidgets.plotOption.buttons.button.click(plotWidgets.toggleOption);
		plotWidgets.plotOption.buttons.off.click(plotWidgets.toggleOption);
		plotWidgets.plotOption.buttons.chartSwitch.click(plotWidgets.toggleContainer);
		plotWidgets.plotContainer.buttons.resize.click(plotWidgets.resizeContainer)
	},

	containerSize:function(){
		return plotWidgets.plotContainer.buttons.resize.attr("cur-size");
	},

	maximizeContainer:function(){
		plotWidgets.plotContainer.resizeIconMin();
		plotWidgets.plotContainer.buttons.resize.attr("cur-size","large");
	},

	restoreContainer:function(){
		plotWidgets.plotContainer.resizeIconMax();
		plotWidgets.plotContainer.buttons.resize.attr("cur-size","small");
	},

	resizeContainer: function(){
		plotWidgets.containerSize()=="small"? plotWidgets.maximizeContainer() :	plotWidgets.restoreContainer();
	},

	toggleOption: function(){
		plotWidgets.plotOption.body.toggle();
	},

	toggleContainer: function(){
		plotWidgets.plotContainer.body.toggle();
	}
		
}

var bacteriaWidget={
	init:function(){
		//Initial variables, body and button.
		bacteriaWidget.body=$("#bacteria-widget").addClass("btn-group btn-group-vertical height8 scrolly");
		bacteriaWidget.buttons=bacteriaWidget.body.find("span").addClass("btn");
		bacteriaWidget.search=$("#bact-search");
		bacteriaWidget.setup();
	},


	setup:function(){
		bacteriaWidget.buttons.click(bacteriaWidget.clickButton);
	},

	setCallback:function(){
		
	},

	clickButton:function(){
		var jbtn=$(this).toggleSelected();
		var bid=jbtn.attr("bid");
		//call func getExperiemnts of pmapiClient.js
		//callback: experimentWidget.append()
		jbtn.hasClass(SELECTED)?Pmapi.getExperiments(null,[bid],experimentWidget.append):experimentWidget.remove(bid);	
	}
}

var experimentWidget={
	init:function(){
		experimentWidget.expRow="<tr eid='%eid%' pname='%pname%' bid='%bid%'><td>%beid%</td><td>%rid%</td><td>%pname%</td><td>%fname%</td><td>%eDate%</td></tr>";
		experimentWidget.expTab="<li><a>%pid%</a></li>";
		experimentWidget.body=$("#experiment-widget");
		experimentWidget.buttonAll=$("#button-sel");
		experimentWidget.tab=$("#plate-type-nav");
		experimentWidget.curtabs={};
		experimentWidget.setup();
	},

	setup:function(){
		experimentWidget.body.on("click","tr",
			function(){
				$(this).toggleSelected();
			}
		);
		experimentWidget.buttonAll.on("click",
			function(){
				experimentWidget.selectAll();
			}
		);
		experimentWidget.tab.on("click","a",
			function(){
				$(this).tab("show");
				var curhtml=$(this).html();
				if(curhtml=="All")
					experimentWidget.body.children().show();
				else{
					experimentWidget.body.children().hide();
					$(experimentWidget.curtabs[$(this).html()]).each(function(){$(this).show()});
				}
				experimentWidget.getPlate(curhtml,plateWidget.updatePlate);
			}
		);
	},

	append:function(dataObj){
		for(var x in dataObj.data){
			var count=dataObj.data[x].count;
			for (var y=0;y<count;y++){
				var data=dataObj.data[x].data[y];
				experimentWidget.appendTab(data.plate_name);
				experimentWidget.curtabs[data.plate_name].push($(experimentWidget.getNewRow(data)).appendTo(experimentWidget.body));
			}
		}
	},

	appendTab:function(pid){
		if(experimentWidget.curtabs[pid]!=null)
			return;
		experimentWidget.curtabs[pid]=[];
		experimentWidget.tab.append(experimentWidget.expTab.replace("%pid%",pid));
	},

	getNewRow:function(rawData){
		return experimentWidget.expRow.replace("%eid%",rawData.experiment_id).replace(/%pname%/g,rawData.plate_name).replace("%bid%",rawData.bacteria_id).replace("%rid%",rawData.replicate_num).replace("%fname%",rawData.file_name).replace("%eDate%",rawData.experiment_date).replace("%beid%",bacteriaWidget.body.find("[bid="+rawData.bacteria_id+"]").attr("bact-ext-id"));	
	},

	selectAll:function(){
		experimentWidget.body.children().toggleSelected();
	},

	getPlate:function(plateName,callback){
		var plate=Pmapi.getPlates(null,	[plateName],plateWidget.updatePlate);
	},

	remove:function(bid){
		experimentWidget.body.children("tr[bid='"+bid+"']").remove();
	}

}

var plateWidget={
	init:function(){
		plateWidget.body=$("#pm-plate-widget");
		plateWidget.wells=$("#pm-plate-table").attr("style","float:left").find("td").wrapInner("<button class='btn'></button>");
		plateWidget.body.find("#pm-plate-info").parent().addClass("table");
		plateWidget.setup();
	},
	
	setup:function(){
		plateWidget.wells.click(plateWidget.clickWell);	
	},

	clickWell:function(){
		$(this).children().toggleSelected();
	},

	updatePlate:function(data){
		var colorScheme=[];
		var counter=0;
		var plate=data.data[Object.keys(data.data)[0]].data;
		for (var info in plate){
			var temp=plate[info];
			console.log(temp);
			if(colorScheme.indexOf(temp.medium_control_name)<0)
				colorScheme[counter++]=temp.medium_control_name;
			plateWidget.wells.filter("#"+temp.well_num).children().addClass("color"+counter);
		}
	}		
}

$(document).ready(plotWidgets.init);
$(document).ready(bacteriaWidget.init);
$(document).ready(experimentWidget.init);
$(document).ready(plateWidget.init);

