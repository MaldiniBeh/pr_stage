<?php
require_once 'connect.php';

$user = [];

// $selectg  = dbase()->prepare("SELECT * FROM Stagiare INNER JOIN Etablissement ON  Stagiare.id_etabli = Etablissement.id_etabli WHERE id_stagiaire NOT IN (SELECT id_stagiaire FROM Entretien)  ORDER BY `id_stagiaire` DESC");
// $selectg->execute();
$selectg  = dbase()->prepare("SELECT * FROM Stagiare WHERE  delet_action = 0  AND id_stagiaire NOT IN (SELECT id_stagiaire FROM Entretien) ORDER BY `id_stagiaire` DESC");
$selectg->execute();
if ($selectg) {
  $cr = 0;
  while ($toto = $selectg->fetch()) {
    $user[$cr]['id']    = $toto['id_stagiaire'];
    $user[$cr]['nom']    = $toto['nom'];
    $user[$cr]['prenom'] = $toto['prenom'];
    $user[$cr]['salaire'] = $toto['salaire'];
    $user[$cr]['date'] = $toto['date_naissance'];
    $user[$cr]['sexe'] = $toto['sexe'];
    $user[$cr]['residence'] = $toto['residence'];
    $user[$cr]['email'] = $toto['email'];
    $user[$cr]['tel'] = $toto['tel'];
    $user[$cr]['situation'] = $toto['situa_mat'];
    $user[$cr]['anne'] = $toto['anne'];
    $user[$cr]['fili'] = $toto['fili'];
    $user[$cr]['id_etabli'] = $toto['id_etabli'];
    $user[$cr]['competence'] = $toto['competence'];

    $cr++;
  }

  echo json_encode(['data' => $user]);
} else {
  http_response_code(404);
}