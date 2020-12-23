<?php
    require_once('php/db.php');

    $sql = "SELECT * FROM `location`";
    $result = $con->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <link rel="stylesheet" type="text/css" href="bootstrap-5.0.0/css/bootstrap.css">
	<link rel='shortcut icon' type='image/x-icon' href='images/favicon.ico' />
	<link rel="stylesheet" href="css/style.css" />
    <title>Document</title>
</head>
<body>  

<nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid">
  <div class="navbar-brand" href="#">Company Directory</div>
</nav>
  <nav class="navbar navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Personnel Quick Search</a>
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
      <br>
        <h1 class="text-center">
            Locations
        </h1>
        <br>
        </div>

        <div class="container">
            <table class="table table-striped table-borderrer">

            <?php
                        if($result->num_rows > 0){
                            echo '<div class="d-grid gap-2 col-6 mx-auto">';
                            echo "<a class='btn btn-primary' href='php/showLocation.php'>Locations</a>";
                            echo '</div>';
                        }

            ?>
            
        </div>

    <script src="js/jquery.js"></script>  
	<script src="bootstrap-5.0.0/js/bootstrap.js"></script>
	<script src="bootstrap-5.0.0/js/bootstrap.bundle.js"></script>
	<script src="js/script.js"></script>
    
</body>
</html>