<?php
        require_once('db.php');

        if(isset($_GET['id']) && isset($_POST['editForm'])){
            $id = $_GET['id'];
            $name = $_POST['pname'];
            $price = $_POST['pprice'];

            $sql = "UPDATE `personnel` SET 
                    `name`= '$name',
                    `departmentLocation`= '$price' 
                    WHERE id = $id";

        if($con->query($sql) === TRUE){
            header ("Location: ../index.php");
                } else {
            echo "Something went wrong!";
        } 

        }else{
            echo "invalid";
        }
?>