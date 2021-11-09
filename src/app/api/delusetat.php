<?php
require 'connect.php';
$eta = [];
// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);
  //var_dump($request);
  //var_dump($request->data);
  $selectv = dbase()->prepare("DELETE FROM `Etablissement` WHERE `Etablissement`.`id_etabli` = ? ");

  $pv = $selectv->execute(array(htmlspecialchars($request->data)));

  if ($pv) {
    http_response_code(201);
    $eta = [
      'id' => $request->data->id,
      'nom' => $request->data->nom,
    ];
    echo json_encode(['data' => $eta]);
  } else {
    http_response_code(422);
  }
}
