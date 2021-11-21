<?php
require 'connect.php';
$user = [];
// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);
  // var_dump($request);
  // exit();
  if ($request->data->opt == 'opt') {
    $sthe = dbase()->prepare("SELECT * FROM `Personnel` WHERE email_p =? and  droit = 'AdminGenerale'");
    $sthe->execute(array(
      htmlspecialchars($request->data->valeur)
    ));

    if ($sthe->rowCount() == 1) {
      http_response_code(201);
      $cr = 0;
      while ($toto = $sthe->fetch()) {
        $user[$cr]['nom']    = $toto['nom_p'];
        $user[$cr]['prenom'] = $toto['prenom_p'];
        $user[$cr]['profession'] = $toto['profession'];
        $user[$cr]['email'] = $toto['email_p'];
        $user[$cr]['role'] = $toto['droit'];
        $cr++;
      }
      echo json_encode(['data' => $user]);
    } else {
      $user = [
        'res' => 'lose'
      ];
      echo json_encode(['data' => $user]);
    }
  } else {

    $sthe = dbase()->prepare("SELECT * FROM `Personnel`  WHERE email_p =? and del_perso = 0 and actif_inac = 1 and droit != 'AdminGenerale'");
    $sthe->execute(array(
      htmlspecialchars($request->data)
    ));

    if ($sthe->rowCount() == 1) {
      http_response_code(201);
      $cr = 0;
      while ($toto = $sthe->fetch()) {
        $user[$cr]['nom']    = $toto['nom_p'];
        $user[$cr]['prenom'] = $toto['prenom_p'];
        $user[$cr]['profession'] = $toto['profession'];
        $user[$cr]['email'] = $toto['email_p'];
        $user[$cr]['role'] = $toto['droit'];
        $cr++;
      }
      echo json_encode(['data' => $user]);
    } else {
      $user = [
        'res' => 'lose'
      ];
      echo json_encode(['data' => $user]);
    }
  }
}
