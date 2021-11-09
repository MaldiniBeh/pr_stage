<?php
require 'Database.php';

class Projet
{
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function users()
    {

        $result = "";

        $users = $this->db->select("SELECT * FROM Saradd ORDER BY id DESC");
        foreach ($users as $user => $value) {
            $result .= <<<HTML
            
                <tr>
                    <td> {$value->id} </td>
                    <td> {$value->nom} </td>
                    <td> {$value->prenom} </td>
                    <td>
                        <button class="btn btn-outline-success" id_user="{$value->id}" data-toggle="modal" data-target="#modif_{$value->id}">Modifier</button>
                        <!-- Modal Modifier -->
                        <div class="modal fade" id="modif_{$value->id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title font-weight-bold" id="exampleModalLabel">Modifier</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div>
                                            <label for="nom_{$value->id}">Nom</label>
                                            <input type="text" id="nom_{$value->id}" class="form-control mb-1" value="{$value->nom}">
                                            <label for="pre_{$value->id}">Prénom</label>
                                            <input type="text" id="pre_{$value->id}" class="form-control mb-3" value="{$value->prenom}">
                                            <div id="error" class="text-danger text-center font-weight-bold"></div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" data-dismiss="modal">Annuler</button>
                                        <button type="button" class="btn btn-success mod" id_user="{$value->id}">Modifier</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-outline-danger" id_user="{$value->id}" data-toggle="modal" data-target="#modal_{$value->id}">Supprimer</button>
                        <!-- Modal Supprimer -->
                        <div class="modal fade" id="modal_{$value->id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title font-weight-bold" id="exampleModalLabel">Supprimer</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="text-danger modal-body">
                                    Voulez-vous vraiment supprimer ce individu ? Cette action est irréversible...
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-success" data-dismiss="modal">Non</button>
                                    <button type="button" class="btn btn-danger sup" id_user="{$value->id}">Oui</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>                
HTML;
        }
        return $result;
    }

    public function add($array)
    {
        $sql = "INSERT INTO Saradd(nom,prenom) VALUES(:nom,:prenom)";
        $data = [
            'nom' => $array['nom'],
            'prenom' => $array['pre']
        ];
        return $this->db->insert($sql, $data);
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
     $selectg  ="SELECT * FROM Users WHERE pseudo = :pseudo ";
    $data = [
        'pseudo' => $array['pseudo'],
        'mdp'  => $array['mdp']
            ];
            $toto =  $this->db->select($selectg,true,$data);
       if ($toto['passe'] != sha1($data['mdp']) && $toto['pseudo'] == $data['pseudo']) {
        return 3;
    } else {
        $otdata = sha1($data['mdp']);
        $ndata = [
            'pseudo' => $array['pseudo'],
            'mdp'  => $otdata
                ];
        $select ="SELECT * FROM Users WHERE pseudo = :pseudo AND passe = :mdp";
      $tata = $this->db->select( $select,true,$ndata);
       
        if ($tata->rowCount() > 0) {
            return 2;
        } else {
            $sql = "INSERT INTO Saradd(nom,prenom) VALUES(:nom,:prenom)";
        $idata = [
            'pseudo' => $array['pseudo'],
            'mdp' =>sha1($array['mdp']) 
        ];
          $insert = "INSERT INTO Users(pseudo,passe) VALUES(:pseudo,:passe)";
            $succ =  $this->db->insert($insert,$idata);
                if ($succ) {
                // $_SESSION['connect'] = true;
                // $_SESSION['pseudoi'] = $_POST['pseudoi'];
                return 1;
            }
        }
    }
}
}