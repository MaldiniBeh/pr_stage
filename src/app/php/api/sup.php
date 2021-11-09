<?php 
    require '../class/Projet.php';
    
    $db_Projet = (new Projet);

    $result = $db_Projet->del($_POST);

    if($result) { echo 1; } else { echo 0; }
?>