<?php
require 'connect.php';
$user = [];
// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);

  $insert = dbase()->prepare("INSERT INTO Personnel(nom_p,prenom_p,email_p,profession,droit)
    VALUES(?,?,?,?,?)");
  $succ = $insert->execute(array(
    htmlspecialchars($request->data->nom),
    htmlspecialchars($request->data->prenom),
    htmlspecialchars($request->data->email),
    htmlspecialchars($request->data->profession),
    htmlspecialchars($request->data->role)
  ));

  if ($succ) {
    http_response_code(201);
    $user = [
      'id' => $request->data->id,
      'nom' => $request->data->nom,
      'prenom' => $request->data->prenom,
      'profession' => $request->data->profession,
      'role' => $request->data->role,
      'email' => $request->data->email

    ];
    echo json_encode(['data' => $user]);
  } else {
    http_response_code(422);
  }
}
