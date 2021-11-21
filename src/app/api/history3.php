<?php
require_once 'connect.php';

$user2 = [];


$selectStpro  = dbase()->prepare("SELECT * FROM  Stagiare st INNER JOIN Stage sta ON st.id_stagiaire = sta.id_stagiaire INNER JOIN Encadrer enc ON enc.id_stagiare = sta.id_stagiaire INNER JOIN Personnel per ON enc.id_pers = per.id_pers WHERE st.salaire > 0 ORDER BY `sta`.`id_sta` DESC");
$selectStpro->execute();
if ($selectStpro) {
  //
  $cr = 0;
  while ($tata = $selectStpro->fetch()) {

    $user2[$cr]['nom']    = $tata['nom'];
    $user2[$cr]['prenom'] = $tata['prenom'];
    $user2[$cr]['date_naissance'] = $tata['date_naissance'];
    $user2[$cr]['sexe'] = $tata['sexe'];
    $user2[$cr]['residence'] = $tata['residence'];
    $user2[$cr]['email'] = $tata['email'];
    $user2[$cr]['situa_mat'] = $tata['situa_mat'];
    $user2[$cr]['salaire'] = $tata['salaire'];
    $user2[$cr]['id_stagiaire'] = $tata['id_stagiaire'];
    $user2[$cr]['numero'] = $tata['tel'];
    $user2[$cr]['nom_et'] = $tata['nom_et'];
    $user2[$cr]['competence'] = $tata['competence'];

    $user2[$cr]['id_stg'] = $tata['id_sta'];
    $user2[$cr]['etat_sta'] = $tata['etat_sta'];
    $user2[$cr]['dure_d'] = $tata['dure_d'];
    $user2[$cr]['dure_f'] = $tata['dure_f'];


    $user2[$cr]['prenom_encad'] = $tata['prenom_p'];
    $user2[$cr]['nom_encad'] = $tata['nom_p'];
    $user2[$cr]['profe_encad'] = $tata['profession'];
    $user2[$cr]['id_pers_encd'] = $tata['id_pers'];
    /***end */

    $cr++;
  }

  echo json_encode(['data2' => $user2]);
} else {
  http_response_code(404);
}
