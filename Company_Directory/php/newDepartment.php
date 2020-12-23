<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <link rel="stylesheet" type="text/css" href="../bootstrap-5.0.0/css/bootstrap.css">
	<link rel='shortcut icon' type='image/x-icon' href='images/favicon.ico' />
	<link rel="stylesheet" href="css/style.css" />
    <title>Company Directory</title>
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
            New Department
        </h1>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-sm-12">
                    <form action="submitDepartment.php" method="POST">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" name="dname" id="name">
                        </div>
                        <div class="form-group">
                            <label for="name">Location ID</label>
                            <input type="text" class="form-control" name="id" id="price">
                        </div>

                        <input type="submit" name="submitForm" value="submit" class="btn btn-primary btn-block">
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