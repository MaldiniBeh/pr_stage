<?php
require '../connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);

  $sthe = dbase()->prepare("UPDATE `Entretien` SET `date_ent` =?,`heure`=?,`lieu`=?,`id_pers`=?
    WHERE id_entre =?");
  $succ =  $sthe->execute(array(
    htmlspecialchars($request->data->date_ent),
    htmlspecialchars($request->data->heure),
    htmlspecialchars($request->data->lieu),
    htmlspecialchars($request->data->id_pers),
    htmlspecialchars($request->data->id_entre)
  ));
  if ($succ) {
    http_response_code(204);
  } else {
    return http_response_code(422);
  }
}