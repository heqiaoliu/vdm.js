<?php
ini_set('display_errors', 'On');
include_once("VDMQueryChecker.php");
/**
 *
 */
class Pmapi{
	protected static $TYPES=["getBacteriaList","getBacteria","getExperiment","getPlate","getGrowth"];
	private static $ERR_JSON='{"success":false,"error_message":"%MSG%","error_code":%CODE%}';

	public static function process(){
		$query=$_SERVER["REQUEST_METHOD"]==="GET"?$_GET:$_POST;
		try{
			$query=VDMQueryChecker::checkToken($query);
			VDMQueryChecker::checkType($query["type"],self::$TYPES);
			$query["param"]=VDMQueryChecker::checkParam($query["param"]);
		}catch(Exception $e){
			echo self::replaceErr($e);
			exit();
		}
		switch($query["type"]){
			case self::$TYPES[0]:
				echo self::getBacteriaList();
				break;
			case self::$TYPES[1]:
				echo self::getBacteria($query["param"]);
				break;
			default:
				echo "{test}";
		}
	}

	

	private static function replaceErr($e){
		return str_replace("%CODE%",$e->getCode(),str_replace("%MSG%",$e->getMessage(),self::$ERR_JSON));
	}

	private static function getBacteriaList(){
		return '{"data":[
	{"bacteria_id":3,"bacteria_external_id":"EDT2236","bacteria_name":"Escherichia coli","vc_id":5530,"vector":"pEMB11"},
	{"bacteria_id":20,"bacteria_external_id":"EDT2241","bacteria_name":"Escherichia coli","vc_id":5536,"vector":"pEMB11"},
	{"bacteria_id":21,"bacteria_external_id":"EDT2240","bacteria_name":"Escherichia coli","vc_id":5535,"vector":"pEMB11"}],
	"count":5,"success":true,"error_message":null,"error_code":null,"mid":0}';
	}

	private static function getBacteria($beids){
		$temp=json_decode('{"EDT2236":{"bacteria_id":3,"bacteria_external_id":"EDT2236","bacteria_name":"Escherichia coli","vc_id":5530,"vector":"pEMB11"},"EDT2240":{"bacteria_id":21,"bacteria_external_id":"EDT2240","bacteria_name":"Escherichia coli","vc_id":5535,"vector":"pEMB11"},"EDT2241":{"bacteria_id":20,"bacteria_external_id":"EDT2241","bacteria_name":"Escherichia coli","vc_id":5536,"vector":"pEMB11"}}');
		$data=[
		];
		echo json_encode($temp);
	}

	private static function getExperiment($bids){
		$temp=json_decode('{"3":{"data":[{"experiment_id":37,"bacteria_id":3,"experiment_date":"2012-04-12","file_name":"EDT2236A-ID599.txt","plate_id":2,"plate_name":"PM1","replicate_num":1},{"experiment_id":38,"bacteria_id":3,"experiment_date":"2012-04-12","file_name":"EDT2236B-ID600.txt","plate_id":2,"plate_name":"PM1","replicate_num":2},{"experiment_id":39,"bacteria_id":3,"experiment_date":"2012-04-12","file_name":"EDT2236C-ID601.txt","plate_id":2,"plate_name":"PM1","replicate_num":3}],"count":3},"20":{"data":[{"experiment_id":52,"bacteria_id":20,"experiment_date":"2012-04-18","file_name":"EDT2241A - ID619(18April2012).txt","plate_id":2,"plate_name":"PM1","replicate_num":1},{"experiment_id":53,"bacteria_id":20,"experiment_date":"2012-04-18","file_name":"EDT2241B - ID620(18April2012).txt","plate_id":2,"plate_name":"PM1","replicate_num":2},{"experiment_id":54,"bacteria_id":20,"experiment_date":"2012-04-18","file_name":"EDT2241C - ID621(18April2012).txt","plate_id":2,"plate_name":"PM1","replicate_num":3},{"experiment_id":213,"bacteria_id":20,"experiment_date":"2012-08-04","file_name":"EDT2241A-ID930(04Aug2012).txt","plate_id":2,"plate_name":"PM1","replicate_num":4},{"experiment_id":214,"bacteria_id":20,"experiment_date":"2012-08-04","file_name":"EDT2241B-ID931(04Aug2012).txt","plate_id":2,"plate_name":"PM1","replicate_num":5},{"experiment_id":215,"bacteria_id":20,"experiment_date":"2012-08-04","file_name":"EDT2241C-ID932(04Aug2012).txt","plate_id":2,"plate_name":"PM1","replicate_num":6}],"count":6},"21":{"data":[{"experiment_id":49,"bacteria_id":21,"experiment_date":"2012-04-18","file_name":"EDT2240A - ID616(18April2012).txt","plate_id":2,"plate_name":"PM1","replicate_num":1},{"experiment_id":50,"bacteria_id":21,"experiment_date":"2012-04-18","file_name":"EDT2240B - ID617(18April2012).txt","plate_id":2,"plate_name":"PM1","replicate_num":2},{"experiment_id":51,"bacteria_id":21,"experiment_date":"2012-04-18","file_name":"EDT2240C - ID618(18April2012).txt","plate_id":2,"plate_name":"PM1","replicate_num":3}],"count":3}}');
		
	}
}
Pmapi::process();
?>
