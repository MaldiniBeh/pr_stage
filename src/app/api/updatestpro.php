<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);
  // echo $request;
  $sthe = dbase()->prepare("UPDATE `Stagiare` SET
   `nom` = ?, `prenom` = ?,
   `date_naissance` = ?,`sexe` = ?, `residence`=?,
   `email`=?, `tel`=?, `situa_mat`=?, `salaire`=?,`competence`=?
    WHERE id_stagiaire =?");
  $succ =  $sthe->execute(array(
    htmlspecialchars($request->data->nom),
    htmlspecialchars($request->data->prenom),
    htmlspecialchars($request->data->date),
    htmlspecialchars($request->data->sexe),
    htmlspecialchars($request->data->residence),
    htmlspecialchars($request->data->email),
    htmlspecialchars($request->data->tel),
    htmlspecialchars($request->data->situation),
    htmlspecialchars($request->data->salaire),
    htmlspecialchars($request->data->competence),
    htmlspecialchars($request->data->id)

  ));
  if ($succ) {
    http_response_code(204);
  } else {
    return http_response_code(422);
  }
}