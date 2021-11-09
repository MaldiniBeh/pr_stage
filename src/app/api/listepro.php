<?php
require_once 'connect.php';

$user = [];

$selectg  = dbase()->prepare("SELECT * FROM Stagiare WHERE salaire != 'NULL' AND id_stagiaire NOT IN (SELECT id_stagiaire FROM Entretien) ORDER BY `id_stagiaire` DESC");
$selectg->execute();
if ($selectg) {
  $cr = 0;
  while ($toto = $selectg->fetch()) {
    $user[$cr]['id']    = $toto['id_stagiaire'];
    $user[$cr]['nom']    = $toto['nom'];
    $user[$cr]['prenom'] = $toto['prenom'];
    $user[$cr]['email'] = $toto['email'];
    $user[$cr]['tel'] = $toto['tel'];
    $user[$cr]['salaire'] = $toto['salaire'];
    $user[$cr]['sexe'] = $toto['sexe'];
    $user[$cr]['date'] = $toto['date_naissance'];
    $user[$cr]['residence'] = $toto['residence'];
    $user[$cr]['salaire'] = $toto['salaire'];
    $user[$cr]['situation'] = $toto['situa_mat'];

    $cr++;
  }

  echo json_encode(['data' => $user]);
} else {
  http_response_code(404);
}