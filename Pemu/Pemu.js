var pemu=(function(){
	var WIDTH="width",HEIGHT="height";
	var DEF={
		border:1px
	};

	function setCellWidth(x){
		return x/18.5;
	}

	function setCellHeight(y){
		return y/12.5;
	}

	

	function emu(container,x,y){
		this.cell_width=setCellWidth(x);
		this.cell_height=setCellHeight(y);
		this.$container=container.attr(WIDTH,x).attr(HEIGHT,y);
		this.border=DEF.border;
	}


	emu.prototype.updateText=function(){

	}

	emu.prototype.updateBackground=function(){

	}


	
	return{
		getPemu:function(x,y){return new emu(x,y);}
	}
}());
