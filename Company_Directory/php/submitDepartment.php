<?php
    require_once('db.php');

    if(isset($_POST['submitForm'])){
        $name = $_POST['dname'];
        $id = $_POST['id'];
        
        $sql = "INSERT INTO `department`(`name`, `locationID`) 
                VALUES ('$name', '$id')";

        if($con->query($sql) === TRUE){
            header ("Location: ../index.php");
        } else {
            echo "Something went wrong!";
        } 

    } else {
        echo "no submit";
    }
?>