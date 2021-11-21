<?php
require_once 'connect.php';

$user = [];
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
/***View more info about academy */
if ($request->data->opt) {

  $selectg  = dbase()->prepare("SELECT * FROM Stagiare WHERE id_stagiaire = ?");
  $succ = $selectg->execute(array(
    htmlspecialchars($request->data->id)
  ));

  if ($succ) {
    //
    $cr = 0;
    while ($toto = $selectg->fetch()) {

      $user[$cr]['anne']    = $toto['anne'];
      $user[$cr]['fili']    = $toto['fili'];
      $user[$cr]['id_etabli']    = $toto['id_etabli'];
    }

    echo json_encode(['data' => $user]);
  } else {
    http_response_code(404);
  }
} else {
  $selectg  = dbase()->prepare("SELECT * FROM Entretien et INNER JOIN Personnel pe ON et.id_pers = pe.id_pers WHERE id_stagiaire = ?");
  $succ = $selectg->execute(array(
    htmlspecialchars($request->data)
  ));


  if ($succ) {
    //
    $cr = 0;
    while ($toto = $selectg->fetch()) {
      /***Entre */
      $user[$cr]['id_entre']    = $toto['id_entre'];
      $user[$cr]['date_ent']    = $toto['date_ent'];
      $user[$cr]['heure']    = $toto['heure'];
      $user[$cr]['lieu']    = $toto['lieu'];
      $user[$cr]['prenom_entre'] = $toto['prenom_p'];
      $user[$cr]['nom_entre'] = $toto['nom_p'];
      $user[$cr]['profe_entre'] = $toto['profession'];
      $user[$cr]['id_pers_entre'] = $toto['id_pers'];
      $user[$cr]['id_stagiaire'] = $toto['id_stagiaire'];
      $user[$cr]['observation'] = $toto['observation'];
    }

    echo json_encode(['data' => $user]);
  } else {
    http_response_code(404);
  }
}



// $selectg  = dbase()->prepare("SELECT * FROM Entretien et INNER JOIN Stagiare st ON et.id_stagiaire = st.id_stagiaire INNER JOIN Personnel per ON et.id_pers = per.id_pers INNER JOIN Stage sta ON et.id_stagiaire = sta.id_stagiaire INNER JOIN Etablissement eta ON st.id_etabli = eta.id_etabli  ORDER BY `et`.`id_stagiaire` DESC");
// $selectg->execute();
