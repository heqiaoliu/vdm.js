/*** 
 * Three string of URL QUERY to use pmapi.php
 *@ const
 * */
var API_QUERY_GETBACTERIALIST="type=getBacteriaList&mid=";
var API_QUERY_GETBACTERIAS="type=getBacterias&param=";
var API_QUERY_GETPLATES="type=getPlates&param=%param%&mid=%mid%";
var API_QUERY_GETEXPERIMENTS="type=getExperiments&param=";
var API_QUERY_GETGROWTH="type=getGrowth&param=%param%&mid=%mid%";
var API_TOKEN_PARAM="%param%";
var API_TOKEN_MID="%mid%";
/***
 * 
 */

function getFromPmapi(query,callback){
	$.ajax({
		url:"//vdm.sdsu.edu/data/api/pmapi.php",
		type:"POST",
		data:query,
		dataType:"json",
		success:callback
	});
}

function getBacteriaList(mid,callback){
	tmpQuery=API_QUERY_GETBACTERIALIST+mid;
}

function getExperiments(mid,bids,callback){
	tmpQuery=API_QUERY_GETEXPERIMENTS+JSON.stringify(bids)+'&mid='+mid;
	getFromPmapi(tmpQuery,callback);
}

function getPlates(mid,plateNames,callback){
	getFromPmapi(API_QUERY_GETPLATES.replace(API_TOKEN_PARAM,JSON.stringify(plateNames)).replace(API_TOKEN_MID,mid),callback);
}

function getCurves(mid,ExpWellIds,callback){
	getFromPmapi(API_QUERY_GETGROWTH.replace(API_TOKEN_PARAM,JSON.stringify(ExpWellIds)).replace(API_TOKEN_MID,mid),callback);
}

function test(param){
	console.log(param);
}
