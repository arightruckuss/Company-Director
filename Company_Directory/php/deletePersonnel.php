<?php
    require_once('db.php');

    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $sql = "DELETE FROM `personnel` WHERE id = $id";

        if($con->query($sql) === TRUE){
            echo "Deleted the data!";
            sleep(2);
            header ("Location: ../index.php");
        } else {
            echo "Something went wrong!";
        } 

    } else {
        die('id not provided');
    }


?>