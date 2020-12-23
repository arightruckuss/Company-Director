<?php
    require_once('db.php');

    $id = $_GET['id'];
    $sql = "SELECT * FROM `personnel` where departmentID = $id";
    $result = $con->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <link rel="stylesheet" type="text/css" href="../bootstrap-5.0.0/css/bootstrap.css">
	<link rel='shortcut icon' type='image/x-icon' href='images/favicon.ico' />
	<link rel="stylesheet" href="css/style.css" />
    <title>Document</title>
</head>
<body>  
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
        <div class="container-fluid">
        <a class="navbar-brand" href="#">Company Directory</a>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                <a class='btn btn-primary' href='showLocation.php'>Location</a>
                </li>
            </ul>
            <a class="navbar-brand" id="searchBar" href="#">Personnel Quick Search</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
    </nav>
    <div class="jumbotron">
        <h1 class="text-center">
            Personnel
        </h1>
        </div>

        <div class="container">
            <table class="table table-striped table-borderrer">
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Department ID
                    <th>Action</th>
                </tr>

                <?php
                    if($result->num_rows > 0){
                        while($row = $result->fetch_assoc()){
                            echo "<tr>";
                            echo  "<td>" . $row['id'] . "</td>";
                            echo  "<td>" . $row['firstName'] . "</td>";
                            echo  "<td>" . $row['lastName'] . "</td>";
                            echo  "<td>" . $row['email'] . "</td>";
                            echo  "<td>" . $row['departmentID'] . "</td>";
                            echo "<td>";
                            echo "<div class='btn-group'>";
                            echo "<a class='btn btn-secondary' href='edit.php?id=" . $row['id'] ."'>Edit</a>";
                            echo "<a class='btn btn-danger' href='deletePersonnel.php?id=" . $row['id'] ."'>Delete</a>";
                            echo "</div>";
                            echo "</td>";
                            echo "</tr>";
                        }
                    }
                ?>

    <script src="js/jquery.js"></script>  
	<script src="bootstrap-5.0.0/js/bootstrap.js"></script>
	<script src="bootstrap-5.0.0/js/bootstrap.bundle.js"></script>
	<script src="js/script.js"></script>
    
</body>
</html>