<?php

$con = new mysqli('localhost', 'rucktooa', 'RucktooaMySQL1!', 'companydirectory') or die(mysqli_error($mysqli));

if($con->connect_error){
    die("connect error");
} 