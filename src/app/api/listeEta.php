<?php
require_once 'connect.php';

$etab = [];

$selectg  = dbase()->prepare("SELECT * FROM Etablissement ");
$selectg->execute();
if ($selectg) {
  $cr = 0;
  while ($toto = $selectg->fetch()) {
    $etab[$cr]['id']    = $toto['id_etabli'];
    $etab[$cr]['nom']    = $toto['nom_et'];
    $cr++;
  }

  echo json_encode(['data' => $etab]);
} else {
  http_response_code(404);
}