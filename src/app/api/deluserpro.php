<?php
require 'connect.php';
$user = [];

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {

  $request = json_decode($postdata);

  $selectv = dbase()->prepare("DELETE FROM `Stagiare` WHERE `Stagiare`.`id_stagiaire` = ? ");

  $pv = $selectv->execute(array(htmlspecialchars($request->data)));

  if ($pv) {
    http_response_code(201);
    $user = [
      'id' => $request->data->id,
      'nom' => $request->data->nom,
      'prenom' => $request->data->prenom,
      'profession' => $request->data->profession,
      'email' => $request->data->email,
      'droit' => $request->data->role
    ];
    echo json_encode(['data' => $user]);
  } else {
    http_response_code(422);
  }
}
