/**
 *
 * Pemu: Plate Enulator
 * Description:
 * 	Pemu initialize a plate (HTML <table>) with defined rows and columns of wells.
 * ############...
 * # (A1) (A2) ...
 * # (B1) (B2) ...
 * . .
 * . .
 * . .
 *
 */

/********************************************************************************
 *	We need to learn design pattern from JqueryUI,
 *	but for now, let's have the work done quick and clean.
 *	---HQ
 *
 *	jQuery Pemu Plug-in, whihc is able to create new Pemu to the target container.
 */
(function($){
	//Private functions.
	/**Function:createPemu
	 * create a string of html <table> which is a new Pemu.
	 * @param {int} row is the number of row to generate the plate.
	 * @param {int} column is the number of column to generate the plate.
	 * @return {String} s is the html string of a Pemu, used to append to the container.
	 */
	function createPemu(row, column){
		//ascii for 'A'
		var a=65,
		//String variable for appending
		s="";

		for (var i=0;i<row;i++){
			var index=String.fromCharCode(c++);
			s+="<tr>";
			for(var j=1;j<=column;j++){
				s+="<td>{{well."+index+j+"}}</td>";
			}   
			s+="</tr>";
		} 
		return s;
	}

	/**
	 * Public Methods of the Plugin.
	 */
	$.fn.Pemu=function(row,column){
			$(this).append(createPemu(row,column));
			return this;
	}
})(jQuery)

function Pemu(elem,row,column){
	this.id=elem;
	this.$container=$("#"+elem);
	this.row=row;
	this.column=column;
	this.$container.Pemu(row,column);
	this.display={};
	this.storage={};
}

Pemu.prototype={
	displayController: function($scope,obj){
		$scope.well=obj;
	}
	
}


