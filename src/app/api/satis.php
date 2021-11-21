<?php
require_once 'connect.php';

$user = [];

$selectg  = dbase()->prepare("SELECT * FROM Stage WHERE del_stage = 0");
$selectg->execute();
if ($selectg) {
  $cr = 0;
  while ($toto = $selectg->fetch()) {
    $user[$cr]['id']    = $toto['id_sta'];
    $user[$cr]['theme']    = $toto['theme'];
    $user[$cr]['etat_sta'] = $toto['etat_sta'];
    $user[$cr]['dure_d'] = $toto['dure_d'];
    $user[$cr]['dure_f'] = $toto['dure_f'];
    $user[$cr]['id_stagiaire'] = $toto['id_stagiaire'];
    $cr++;
  }

  echo json_encode(['data' => $user]);
} else {
  http_response_code(404);
}