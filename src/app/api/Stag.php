<?php
require 'connect.php';
$user = [];
// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);

  $insert = dbase()->prepare("UPDATE Stage SET theme =?, etat_sta=?,dure_d=?,dure_f=? WHERE id_stagiaire=?");
  $succ = $insert->execute(array(
    htmlspecialchars($request->data->theme),
    htmlspecialchars($request->data->etat_sta),
    htmlspecialchars($request->data->dure_d),
    htmlspecialchars($request->data->dure_f),
    htmlspecialchars($request->data->id_stagiaire)
  ));
  $insert2 = dbase()->prepare("INSERT INTO Encadrer(id_stagiare,id_pers)
    VALUES(?,?)");
  $succ2 = $insert2->execute(array(
    htmlspecialchars($request->data->id_stagiaire),
    htmlspecialchars($request->data->id_pers),

  ));

  if ($succ) {
    http_response_code(204);
  } else {
    http_response_code(422);
  }
}