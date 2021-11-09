<?php
require_once 'connect.php';

$user = [];

$selectg  = dbase()->prepare("SELECT * FROM Entretien et INNER JOIN Stagiare st ON et.id_stagiaire = st.id_stagiaire INNER JOIN Personnel per ON et.id_pers = per.id_pers INNER JOIN Stage sta ON et.id_stagiaire = sta.id_stagiaire INNER JOIN Etablissement eta  ON st.id_etabli = eta.id_etabli ORDER BY `et`.`id_stagiaire` DESC");
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
    $user[$cr]['id_pers'] = $toto['id_pers'];
    $user[$cr]['date_naissance'] = $toto['date_naissance'];
    $user[$cr]['sexe'] = $toto['sexe'];
    $user[$cr]['residence'] = $toto['residence'];
    $user[$cr]['email'] = $toto['email'];
    $user[$cr]['email_p'] = $toto['email_p'];
    $user[$cr]['situa_mat'] = $toto['situa_mat'];
    $user[$cr]['anne'] = $toto['anne'];
    $user[$cr]['fili'] = $toto['fili'];
    $user[$cr]['profession'] = $toto['profession'];
    $user[$cr]['nomp'] = $toto['nom_p'];
    $user[$cr]['theme'] = $toto['theme'];
    $user[$cr]['etat_sta'] = $toto['etat_sta'];
    $user[$cr]['prenomp'] = $toto['prenom_p'];
    $user[$cr]['dure_d'] = $toto['dure_d'];
    $user[$cr]['dure_f'] = $toto['dure_f'];
    $user[$cr]['salaire'] = $toto['salaire'];
    $user[$cr]['id_stagiaire'] = $toto['id_stagiaire'];
    $user[$cr]['nom_et'] = $toto['nom_et'];
    $user[$cr]['numero'] = $toto['tel'];
    $cr++;
  }

  echo json_encode(['data' => $user]);
} else {
  http_response_code(404);
}
