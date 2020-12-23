<?php
if(!isset($_GET['id'])){
    die('id not provided');
}
    require_once('db.php');
    $id = $_GET['id'];
    $sql = "SELECT * FROM `department` where id = $id";
    $result = $con->query($sql);
    if($result->num_rows != 1){
        die('id not found');
    }
    $data = $result->fetch_assoc();

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

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href="#">Company Directory</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="http://localhost/Employee%20Management/index.php">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="http://localhost/Employee%20Management/show.php">Department</a>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>

    <div class="jumbotron">
        <h1 class="text-center">
            Edit Location
        </h1>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-sm-12">
                    <form action="modifyLocation.php?id=<?= $id ?>" method="POST">
                    <h3>Edit Form</h3>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" name="pname" id="name" value="<?= $data['name']?>">
                        </div>
                        <div class="form-group">
                            <label for="name">Location ID</label>
                            <input type="text" class="form-control" name="pprice" id="price" value="<?= $data['locationID']?>">
                        </div>

                        <input type="submit" name="editFormLocation" value="submit" class="btn btn-primary btn-block">
                    </form>
                </div>
            </div>
        </div>   

    <script src="js/jquery.js"></script>  
	<script src="bootstrap-5.0.0/js/bootstrap.js"></script>
	<script src="bootstrap-5.0.0/js/bootstrap.bundle.js"></script>
	<script src="js/script.js"></script>
    
</body>
</html>