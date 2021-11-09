<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");
function dbase()
{
  $servname = "localhost";
  $dbname = "Stage_romas";
  $user = "ks_kfa";
  $pass = "ks_kfa";
  try {
    $dbco = new PDO("mysql:host=$servname;dbname=$dbname", $user, $pass);
    $dbco->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbco;
  } catch (PDOException $e) {

    echo "Erreur : " . $e->getMessage();
  }
}