<?php
require '../connect.php';
$eta = [];
// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);
  $sthe = dbase()->prepare("UPDATE `Entretien`
  SET `del_entre` = 1 WHERE id_entre =?");
  $succ =  $sthe->execute(array(
    htmlspecialchars($request->data->entre)
  ));
  if ($succ) {
    $sthst = dbase()->prepare("UPDATE `Stage`
    SET `del_stage` = 1 WHERE id_stagiaire =?");
    $sthst->execute(array(
      htmlspecialchars($request->data->stag)
    ));

    http_response_code(204);
  } else {
    return http_response_code(422);
  }
}