<?php
require 'connect.php';
$stage = [];
// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);

  $insert = dbase()->prepare("INSERT INTO Stagiare(nom,prenom,date_naissance,residence,email,tel,situa_mat,anne,fili,id_etabli,sexe,competence)
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?)");
  $succ = $insert->execute(array(
    htmlspecialchars($request->data->nom),
    htmlspecialchars($request->data->prenom),
    htmlspecialchars($request->data->date),
    htmlspecialchars($request->data->residence),
    htmlspecialchars($request->data->email),
    htmlspecialchars($request->data->tel),
    htmlspecialchars($request->data->situation),
    htmlspecialchars($request->data->anne),
    htmlspecialchars($request->data->fili),
    htmlspecialchars($request->data->id_etabli),
    htmlspecialchars($request->data->sexe),
    htmlspecialchars($request->data->competence)

  ));

  if ($succ) {
    http_response_code(201);
    $stage = [
      'id' => $request->data->id,
      'nom' => $request->data->nom,
      'prenom' => $request->data->prenom,
      'date' => $request->data->date,
      'residence' => $request->data->residence,
      'email' => $request->data->email,
      'tel' => $request->data->tel,
      'situation' => $request->data->situation,
      'anne' => $request->data->role,
      'fili' => $request->data->email,
      'id_etabli' => $request->data->id_etabli

    ];
    echo json_encode(['data' => $stage]);
  } else {
    http_response_code(422);
  }
}
