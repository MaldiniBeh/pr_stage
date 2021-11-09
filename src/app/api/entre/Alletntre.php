<?php
require_once '../connect.php';

$user = [];

$selectg  = dbase()->prepare("SELECT * FROM Entretien et INNER JOIN Stagiare st ON et.id_stagiaire = st.id_stagiaire INNER JOIN Personnel per ON et.id_pers = per.id_pers INNER JOIN Stage sta ON et.id_stagiaire = sta.id_stagiaire WHERE etat_sta = 'attente' ORDER BY `et`.`id_entre` DESC");
$selectg->execute();
if ($selectg) {
  $cr = 0;
  while ($toto = $selectg->fetch()) {
    $user[$cr]['id']    = $toto['id_entre'];
    $user[$cr]['date_ent']    = $toto['date_ent'];
    $user[$cr]['heure']    = $toto['heure'];
    $user[$cr]['lieu']    = $toto['lieu'];
    $user[$cr]['nom']    = $toto['nom'];
    $user[$cr]['prenom'] = $toto['prenom'];
    $user[$cr]['salaire'] = $toto['salaire'];
    $user[$cr]['nomp'] = $toto['nom_p'];
    $user[$cr]['prenomp'] = $toto['prenom_p'];
    $user[$cr]['id_stagiaire'] = $toto['id_stagiaire'];
    $user[$cr]['numero'] = $toto['tel'];
    $cr++;
  }

  echo json_encode(['data' => $user]);
} else {
  http_response_code(404);
}