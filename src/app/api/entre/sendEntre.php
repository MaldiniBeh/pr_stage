<?php
require '../connect.php';
$user = [];
// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);

  $insert = dbase()->prepare("INSERT INTO Entretien(date_ent,heure,lieu,id_stagiaire,id_pers)
    VALUES(?,?,?,?,?)");
  $succ = $insert->execute(array(
    htmlspecialchars($request->data->date_ent),
    htmlspecialchars($request->data->heure),
    htmlspecialchars($request->data->lieu),
    htmlspecialchars($request->data->id_stagiaire),
    htmlspecialchars($request->data->id_pers)
  ));
  $insert2 = dbase()->prepare("INSERT INTO Stage(theme,etat_sta,dure_d,dure_f,id_stagiaire)
    VALUES(?,?,?,?,?)");
  $succ2 = $insert2->execute(array(
    'll', 'attente',
    htmlspecialchars($request->data->date_ent), htmlspecialchars($request->data->date_ent), htmlspecialchars($request->data->id_stagiaire)
  ));

  if ($succ) {
    http_response_code(201);
    $user = [
      'date_ent' => $request->data->date_ent,
      'heure' => $request->data->heure,
      'lieu' => $request->data->lieu,
      'id_stagiaire' => $request->data->id_stagiaire,
      'id_pers' => $request->data->id_pers,
    ];
    echo json_encode(['data' => $user]);
  } else {
    http_response_code(422);
  }
}