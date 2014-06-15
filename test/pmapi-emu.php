<?php
include_once("VDMQueryChecker.php");

class Pmapi{
	public static $BACTERIA;

	public static function process(){
		$query=$_SERVER["REQUEST_METHOD"]==="GET"?$_GET:$_POST;
		
	}

	private static function getBacteriaList(){
		return '{"data":[
	{"bacteria_id":1,"bacteria_external_id":"EDT2231","bacteria_name":"Escherichia coli","vc_id":0,"vector":"pEMB11"},
	{"bacteria_id":2,"bacteria_external_id":"EDT2235","bacteria_name":"Escherichia coli","vc_id":5529,"vector":"pEMB11"},
	{"bacteria_id":3,"bacteria_external_id":"EDT2236","bacteria_name":"Escherichia coli","vc_id":5530,"vector":"pEMB11"},
	{"bacteria_id":20,"bacteria_external_id":"EDT2241","bacteria_name":"Escherichia coli","vc_id":5536,"vector":"pEMB11"},
	{"bacteria_id":21,"bacteria_external_id":"EDT2240","bacteria_name":"Escherichia coli","vc_id":5535,"vector":"pEMB11"}],
	"count":5,"success":true,"error_message":null,"error_code":null,"mid":0}';
	}

		
} 
?>
