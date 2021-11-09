<?php
require 'Database.php';

class Projet
{
  private $db;

  public function __construct()
  {
    $this->db = new Database();
  }


  public function mod($array)
  {
    $sql = "UPDATE Saradd SET nom = :nom, prenom = :prenom WHERE id = :id";
    $data = [
      'nom' => $array['nom'],
      'prenom' => $array['pre'],
      'id' => $array['id']
    ];
    return $this->db->update($sql, $data);
  }

  public function del($array)
  {
    $sql = "DELETE FROM Saradd WHERE id = :id";
    $data = [
      'id' => $array['id']
    ];
    return $this->db->delete($sql, $data);
  }
  public function inscrip($array)
  {
    $selectg  = "SELECT * FROM Users WHERE pseudo = :pseudo ";
    $data = [
      'pseudo' => $array['pseudo'],
      'mdp'  => $array['mdp']
    ];
    $toto =  $this->db->select($selectg, true, $data);
    if ($toto['passe'] != sha1($data['mdp']) && $toto['pseudo'] == $data['pseudo']) {
      return 3;
    } else {
      $otdata = sha1($data['mdp']);
      $ndata = [
        'pseudo' => $array['pseudo'],
        'mdp'  => $otdata
      ];
      $select = "SELECT * FROM Users WHERE pseudo = :pseudo AND passe = :mdp";
      $tata = $this->db->select($select, true, $ndata);

      if ($tata->rowCount() > 0) {
        return 2;
      } else {
        $sql = "INSERT INTO Saradd(nom,prenom) VALUES(:nom,:prenom)";
        $idata = [
          'pseudo' => $array['pseudo'],
          'mdp' => sha1($array['mdp'])
        ];
        $insert = "INSERT INTO Users(pseudo,passe) VALUES(:pseudo,:passe)";
        $succ =  $this->db->insert($insert, $idata);
        if ($succ) {
          // $_SESSION['connect'] = true;
          // $_SESSION['pseudoi'] = $_POST['pseudoi'];
          return 1;
        }
      }
    }
  }
}