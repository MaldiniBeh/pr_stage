<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);

  $sthe = dbase()->prepare("UPDATE `Etablissement` SET `nom_et` = ? WHERE id_etabli =?");
  $succ =  $sthe->execute(array(
    htmlspecialchars($request->data->nom),
    htmlspecialchars($request->data->id),

  ));
  if ($succ) {
    http_response_code(204);
  } else {
    return http_response_code(422);
  }
}