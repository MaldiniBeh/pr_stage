<?php
require 'connect.php';
$user = [];
// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);

  $insert = dbase()->prepare("INSERT INTO Etablissement(nom_et)
    VALUES(?)");
  $succ = $insert->execute(array(
    htmlspecialchars($request->data),
  ));

  if ($succ) {
    http_response_code(201);
    $user = [
      'id' => $request->data->id,
      'nom' => $request->data->nom
    ];
    echo json_encode(['data' => $user]);
  } else {
    http_response_code(422);
  }
}