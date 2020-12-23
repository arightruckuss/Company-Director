<?php
    require_once('db.php');

    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $sql = "DELETE FROM `location` WHERE id = $id";

        if($con->query($sql) === TRUE){
            header ("Location: ../index.php");
        } else {
            echo "Something went wrong!";
        } 

    } else {
        die('id not provided');
    }


?>