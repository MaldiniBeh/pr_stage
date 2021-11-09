<?php
require_once 'connect.php';

$user = [];

$selectg  = dbase()->prepare("SELECT * FROM Personnel WHERE droit !='AdminGenerale' AND del_perso = 0 ORDER BY `Personnel`.`id_pers` DESC");
$selectg->execute();
if ($selectg) {
  $cr = 0;
  while ($toto = $selectg->fetch()) {
    $user[$cr]['id']    = $toto['id_pers'];
    $user[$cr]['nom']    = $toto['nom_p'];
    $user[$cr]['prenom'] = $toto['prenom_p'];
    $user[$cr]['profession'] = $toto['profession'];
    $user[$cr]['email'] = $toto['email_p'];
    $user[$cr]['role'] = $toto['droit'];
    $user[$cr]['actif_ina'] = $toto['actif_inac'];
    $cr++;
  }

  echo json_encode(['data' => $user]);
} else {
  http_response_code(404);
}
