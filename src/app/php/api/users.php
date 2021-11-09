<?php 
    require '../class/Projet.php'; 

    $db_Projet = (new Projet);
    
    echo $db_Projet->users();
?>