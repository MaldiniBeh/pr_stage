<?php
require 'connect.php';
$user = [];

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {

  $request = json_decode($postdata);

  $sthe = dbase()->prepare("UPDATE `Personnel` SET `del_perso` = 1 WHERE `Personnel`.`id_pers` =?");
  $succ =  $sthe->execute(array(
    htmlspecialchars($request->data)
  ));
  if ($succ) {
    http_response_code(204);
  } else {
    return http_response_code(422);
  }

  // $selectv = dbase()->prepare("DELETE FROM `Personnel` WHERE `Personnel`.`id_pers` = ? ");

  //$pv = $selectv->execute(array(htmlspecialchars($request->data)));

  // if ($pv) {
  //   http_response_code(201);
  //   $user = [
  //     'id' => $request->data->id,
  //     'nom' => $request->data->nom,
  //     'prenom' => $request->data->prenom,
  //     'profession' => $request->data->profession,
  //     'email' => $request->data->email,
  //     'droit' => $request->data->role
  //   ];
  //   echo json_encode(['data' => $user]);
  // } else {
  //   http_response_code(422);
  // }
}