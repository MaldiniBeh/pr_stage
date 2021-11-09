<?php
require '../connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);
  // var_dump($request);
  // exit();
  $sthe = dbase()->prepare("UPDATE `Personnel` SET
   `actif_inac` = ? WHERE id_pers =?");
  $succ =  $sthe->execute(array(
    htmlspecialchars($request->valactif),
    htmlspecialchars($request->id)
  ));
  if ($succ) {
    http_response_code(204);
  } else {
    return http_response_code(422);
  }
}