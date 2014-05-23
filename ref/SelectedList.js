/*
 * Object: SelectedList
 */
function SelectedList(){
	this.list={}
	this.wells=[];
	this.csvQuery={};
}

function SLPlate(){
	this.bact={};
}

function SLBact(){
	this.exp=[];
}

SelectedList.prototype.getAll=function(){
	var temp=[];
	for(var x in this.list){
		for(var y in this.list[x].bact){
			var tmp= this.list[x].bact[y].exp;
			for(var z in tmp){
				for(var w in this.wells)
					temp.push([tmp[z],this.wells[w]]);	
			}
		}
	}
	return temp;
}

SelectedList.prototype.addWell=function(wellid){
	this.wells.push(wellid);
}

SelectedList.prototype.add=function(bid,pid,eid){
	if(!(pid in this.list))
		this.list[pid]=new SLPlate();
	this.list[pid].add(bid,eid);
}

SLPlate.prototype.add=function(bid,eid){
	if(!(bid in this.bact))
		this.bact[bid]=new SLBact();
	this.bact[bid].add(eid);
}

SLBact.prototype.add=function(eid){
	this.exp.push(eid);
}

SLBact.prototype.remove=function(eid){
	this.exp.splice(this.exp.indexOf(eid),1);
	return this.exp.length;
}

SLBact.prototype.remove=function(bid,eid){
	if (this.bact[bid].remove(eid)==0)
		delete this.bact[bid];
	return this.bact.length;
}

SelectedList.prototype.remove=function(bid,pid,eid){
	if(this.list[pid].remove(bid,eid)==0)
		delete this.list[pid];
}
