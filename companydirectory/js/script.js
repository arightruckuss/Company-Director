function reload(){
  location.reload();
}

$('body').on('click','#homeButton',function(){
  $("#editPersonnelBtn").css("display", "block");
  $("#saveEditPersonnelBtn").css("display", "none");
  $("#selectedPersonnelTitle").html('Personnel');
  $("#firstName").attr("disabled", true);
  $("#lastName").attr("disabled", true);
  $("#jobTitle").attr("disabled", true);
  $("#email").attr("disabled", true);
  location.reload();
});

  $('body').on('click','#closeDeleteBtn',function(){  
    location.reload();
  })

$("#myInput").on("keyup", function(){
  $("#personnelTable").css("display", "block");
  $("#departmentTable").css("display", "none");
  $("#locationTable").css("display", "none");
})

$("#departmentSearch").on("click", function(){
  $("#personnelTable").css("display", "none");
  $("#departmentTable").css("display", "block");
  $("#locationTable").css("display", "none");
})

$("#locationSearch").on("click", function(){
  $("#personnelTable").css("display", "none");
  $("#departmentTable").css("display", "none");
  $("#locationTable").css("display", "block");
})

$('body').on('click','#welcomeLocationBtn',function(){
  $("#welcomeHolder").css("display", "none");
  $("#locationHolder").css("display", "block");
})

//Edit Department button
$('#editDepartmentBtn').on('click' ,function(){ 
  $("#deleteDepartmentCheckBtn").css("display", "none");
  $("#selectedDepartmentTitle").html('Personnel Edit');
  $("#deleteDepartmentCheckBt").css("display", "none");
  $("#departmentTitle").html('Department Edit');
})

//Edit Department Close btn
$('.editDepartmentCloseBtn').on('click' ,function(){ 
  $("#editDepartmentBtn").css("display", "block");
  $("#editDepartmentCheckBtn").css("display", "none");
  $("#deleteCheckBtn").css("display", "none");
  $("#deleteDepartmentCheckBtn").css("display", "block");
  $("#departmentTitle").html('Department');
  $("#selectedDepartmentName").attr("disabled", true);
})

//Edit Personnel btn
$('#editPersonnelBtn').on('click' ,function(){ 
  $("#deleteCheckBtn").css("display", "none");
  $("#editPersonnelBtn").css("display", "none");
  $("#editCheckBtn").css("display", "block");
  $("#selectedPersonnelTitle").html('Personnel Edit');
  $("#firstName").attr("disabled", false);
  $("#lastName").attr("disabled", false);
  $("#jobTitle").attr("disabled", false);
  $("#email").attr("disabled", false);
})

//Personnel Close btn
$('.editPersonnelCloseBtn').on('click' ,function(){ 
  $("#deleteCheckBtn").css("display", "block");
  $("#editPersonnelBtn").css("display", "block");
  $("#editCheckBtn").css("display", "none");
  $("#selectedPersonnelTitle").html('Personnel');
  $("#firstName").attr("disabled", true);
  $("#lastName").attr("disabled", true);
  $("#jobTitle").attr("disabled", true);
  $("#email").attr("disabled", true);
})

//Edit check btn
$('body').on('click','#editCheckBtn',function(){  
  $("#personnelModal").modal('hide');
  $("#editCheckBtn").css("display", "none");
  $("#deleteCheckBtn").css("display", "none");
})


$('body').on('click','#deleteCheckBtn',function(){  
  $("#personnelModal").modal('hide');
  $("#departmentModal").css("display", "none");
  $("#locationModal").modal('hide');
  $("#editCheckBtn").css("display", "none");
})

            //**LOCATION**
            
//Get all locations
$.ajax({
  url: "php/getAllLocations.php",
  type: 'POST',
  dataType: 'json',
  success: function(result) {
      if (result.status.name == "ok") {
          $(document).ready(function(){
            for (i = 0; i < result['data'].length; i++) {
              $locationID = result['data'][i]['id'];
              $locationName = result['data'][i]['name'];
              $('#locationList').append('<div class="d-grid gap-2 col-6 mx-auto"><button class="btn btn-secondary locationList" type="button" id="'+$locationID+'" name="'+$locationName+'">'+$locationName+'</button><button type="button" class="btn btn-primary infoButton locationInfoBtn" data-bs-toggle="modal" data-bs-target="#locationModal" id="'+$locationID+'" value="'+$locationID+'" name="'+$locationName+'">Info</button></div>');
            }})} 

//Location Info popup
$(document).on('click', '.locationInfoBtn', function() {
  $selectedLocation = $(this).attr('name');
  $selectedLocationID = $(this).attr('value');
  $("#locationID").attr("placeholder", $selectedLocationID);
  $("#editLocationName").val($selectedLocation);
  $("#editLocationID").val($selectedLocationID);

  $('body').on('click','#saveEditLocationBtn',function(){    
    $editLocationName = $("#editLocationName").val();
    console.log($editLocationName);
    console.log($selectedLocationID);
    $.ajax({
      url: "php/editLocation.php",
      type: 'POST',
      dataType: 'json',
      data: {
        id: $selectedLocationID,
        name: $editLocationName,
      },
      success: function(result) {
        if (result.status.name != "ok") {
          alert('There was a error, the ID may be taken please try again');
        }else {
            location.reload();
      }}})//Delete location
    })

  //Delete Location
    $('body').on('click','#deleteLocationBtn',function(){    

    $.ajax({
      url: "php/deleteLocation.php",
      type: 'POST',
      dataType: 'json',
      data: {
        id: $selectedLocationID,
      },
      success: function(result) {
        if (result.status.name != "ok") {
          alert('There was a error, there may be departments in this location');
        }else {
          location.reload();
      }}})})//Delete Location
    });

$('body').on('click','#editLocationBtn',function(){  
  $("#editLocationName").attr("disabled", false);
  $("#editLocationBtn").css('display', 'none');
  $("#deleteLocationCheckBtn").css('display', 'none');
  $("#editLocationCheckBtn").css('display', 'block');
  $("#locationTitle").html('Location Edit');
  $editLocationName = $('#editLocationName').val();

  $.ajax({
    url: "php/editLocation.php",
    type: 'POST',
    dataType: 'json',
    data: {
      name: $editLocationName,
    },
    success: function(result) {
        if (result.status.name != "ok") {
          alert('There was a error, please try again');
        }else {
          location.reload();
    }}})//New location  
})

$('body').on('click','.locationClose',function(){
  $("#editLocationBtn").css('display', 'block');
  $("#editLocationCheckBtn").css('display', 'none');
  $("#deleteLocationCheckBtn").css('display', 'block');
  $("#editLocationName").attr("disabled", true);
})

//New location
$('body').on('click','#saveNewLocationBtn',function(){    
  $newLocationName = $('#newLocationName').val();

$.ajax({
  url: "php/insertLocation.php",
  type: 'POST',
  dataType: 'json',
  data: {
    name: $newLocationName,
  },
  success: function(result) {
      if (result.status.name != "ok") {
        alert('There was a error, the ID may be taken please try again');
      }else {
        location.reload();
  }}})//New location
})

$('body').on('click','.locationList',function(){  
  $( "#newLocationBtn" ).hide();
  $( "#newDepartmentBtn" ).css('display', 'block');
});

//Get all Departments
$('body').on('click','.locationList',function(){
  $("#locationHolder").css("display", "none");
  $("#departmentHolder").css("display", "block");
  $locationChoice = $(this).attr('id');
  $locationNameChoice = $(this).attr('name');
  $("#selectedDepartmentName").html($locationNameChoice);

$.ajax({
  url: "php/getDepartmentByLocID.php",
  type: 'POST',
  dataType: 'json',
  data: {
    id: $locationChoice,
  },
  success: function(result) {
      if (result.status.name == "ok") {
        for (i = 0; i < result['data'].length; i++) {
          $departmentLocID = result['data'][i]['locationID'];
          $departmentLocName = $locationNameChoice;
          $departmentName = result['data'][i]['name'];
          $departmentID = result['data'][i]['id'];
          $('#departmentList').append('<div class="d-grid gap-2 col-6 mx-auto"><button class="btn btn-secondary departmentList" type="button" id="'+$departmentID+'">'+$departmentName+'</button><button type="button" class="btn btn-primary infoButton departmentInfoBtn" data-bs-toggle="modal" data-bs-target="#departmentModal" id="'+$departmentID+'" value="'+$departmentLocID+'" name="'+$departmentName+'">Info</button></div>');
        }} 
        $('#departmentList').append('<button type="button" class="btn btn-outline-primary departmentBackBtn" onclick="reload()">Close</button>');

//Department Info popup
$(document).on('click', '.departmentInfoBtn', function() {
  $selectDepartment = $(this).attr('name');
  $("#selectedDepartmentName").val($selectDepartment);
  $selectDepartmentID = $(this).attr('id');

  $("#selectedDepartmentID").attr("placeholder", $selectDepartmentID );
  $selectDepartmentLocID = $(this).attr('value');
  $("#selectedDepartmentLocID").attr("placeholder", $selectDepartmentLocID);
  $("#selectedDepartmentLocName").attr("placeholder", $locationNameChoice);
  $("#editDepartmentName").val($selectDepartment );
  $("#editDepartmentID").val($selectDepartmentID);
  $("#editDepartmentLocID").val($selectDepartmentLocID );
  $("#editDepartmentLocName").val($departmentLocName);

  $('body').on('click','#editDepartmentBtn',function(){  
    $("#editDepartmentBtn").css("display", "none");
    $("#editDepartmentCheckBtn").css("display", "block");
    $("#selectedDepartmentName").attr("disabled", false);
  })


  $('body').on('click','#saveEditDepartmentBtn',function(){    
    $editDepartmentName = $("#selectedDepartmentName").val();

    $.ajax({
      url: "php/editDepartment.php",
      type: 'POST',
      dataType: 'json',
      data: {
        id: $selectDepartmentID,
        name: $editDepartmentName,
      },
      success: function(result) {
        if (result.status.name != "ok") {
          alert('There was a error, the ID may be taken please try again');
        }else {
          location.reload();
      }}})//Delete location
    })

  $('body').on('click','#deletePersonnelBtn',function(){    
    console.log($selectDepartmentID);
    $.ajax({
      url: "php/deleteDepartment.php",
      type: 'POST',
      dataType: 'json',
      data: {
        id: $selectDepartmentID,
      },
      success: function(result) {
        if (result.status.name != "ok") {
          alert('There was a error, there may be personnel in this department');
        }else {
          location.reload();
      }}})//Delete location
  })
});

//New Department
$('body').on('click','#newDepartmentBtn',function(){ 
  $("#newDepartmentLocID").attr("placeholder", $locationChoice);
  console.log('click') 
})

//New Department
$('body').on('click','#saveNewDepartmentBtn',function(){   
  console.log('click') 
  $newDepartmentName = $('#newDepartmentName').val();
  $newLocationID = $('#newDepartmentLocID').attr('placeholder');
  console.log($newLocationID);

  $.ajax({
    url: "php/insertDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: {
      name: $newDepartmentName,
      locationID: $newLocationID,
    },
    success: function(result) {
        if (result.status.name != "ok") {
          alert('There was a error, the ID may be taken please try again');
        } else {
          location.reload();
    }}})//New location
  })

//Get Personnel from department
$('body').on('click','.departmentList',function(){    
  $("#locationHolder").css("display", "none");
  $("#departmentHolder").css("display", "none");
  $("#personnelHolder").css("display", "block");
  $("#newPersonnelBtn").css("display", "block");
  $("#newDepartmentBtn").css("display", "none");
  $departmentChoiceName = $(this).html();
  $departmentChoiceID = $(this).attr('id');
  $('#departmentTitle').html($departmentChoiceName);
  $('#personnelTitle').html($departmentChoiceName);

  $.ajax({
    url: "php/getPersonnelByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: $departmentChoiceID,
    },
    success: function(result) {
        if (result.status.name == "ok") {
          for (i = 0; i < result['data'].length; i++) {
            console.log(result);
            $personnelID = result['data'][i]['id'];
            $lastName = result['data'][i]['lastName'];
            $firstName = result['data'][i]['firstName'];
            $jobTitle = result['data'][i]['jobTitle'];
            $email = result['data'][i]['email'];
            $departmentID = result['data'][i]['departmentID'];
            $('#personnelList').append('<div class="d-grid gap-2 col-6 mx-auto"><button class="btn btn-secondary personnelList" type="button" id="'+$personnelID+'" value="'+$personnelID+'" firstName="'+$firstName+'" lastName="'+$lastName+'" name="'+$firstName+ ' '+$lastName+'">'+$firstName+' '+$lastName+'</button><button type="button" class="btn btn-primary infoButton personnelInfoBtn" data-bs-toggle="modal" data-bs-target="#personnelModal" id="'+$personnelID+'" email="'+$email+'" jobTitle="'+$jobTitle+'" name="'+$firstName+' '+$lastName+'" firstName="'+$firstName+'" lastName="'+$lastName+'" value="'+$departmentID+'">Info</button></div>');
          }
          $('#personnelList').append('<button type="button" class="btn btn-outline-primary personnelBackBtn" onclick="reload()">Close</button>');
        }

//Personnel Info
$(document).on('click', '.personnelInfoBtn', function() {
  $selectedPersonnelID = $(this).attr('id');
  $selectedPersonnelName = $(this).attr('name');
  $selectedPersonnelFirstName = $(this).attr('firstName');
  $selectedPersonnelLastName = $(this).attr('lastName');
  $selectJobTitle = $(this).attr('jobTitle');
  $selectEmail = $(this).attr('email');
  $personelDepartmentID = $(this).attr('value');
  $personelLocationName =  $locationNameChoice;
  $("#firstName").val($selectedPersonnelFirstName);
  $("#lastName").val($selectedPersonnelLastName);
  $("#email").val($selectEmail);
  $("#personelDepartmentName").val($personelDepartmentID); 
  $("#personelLocationName").val($personelLocationName);

  $('body').on('click','#saveEditPersonnelBtn',function(){   
    $firstNameVal = $("#firstName").val();
    $lastNameVal = $("#lastName").val();
    $jobTitleVal = $("#jobTitle").val();
    $emailVal = $("#email").val();

    $.ajax({
      url: "php/editPersonnel.php",
      type: 'POST',
      dataType: 'json',
      data: {
        id: $personnelID,
        firstName: $firstNameVal,
        lastName: $lastNameVal,
        jobTitle: $jobTitleVal,
        email: $emailVal,
      },
      success: function(result) {
        if (result.status.name != "ok") {
          alert('There was a error, the ID may be taken please try again');
        }else {
          location.reload();
      }}})//Delete location
  })

  $('#deletePersonnelCheck').on('click' ,function(){ 
    $('#personnelHolder').css("display", "none");
  })
}) 
}})
  //Delete Personnel
    $('body').on('click','#deletePersonnelBtn',function(){  
      console.log($selectedPersonnelID);

    $.ajax({
      url: "php/deletePersonnel.php",
      type: 'POST',
      dataType: 'json',
      data: {
        id: $selectedPersonnelID,
      },
      success: function(result) {
          if (result.status.name == "ok") {
            location.reload();
      }}})})//Delete Personnel


$('body').on('click','#newPersonnelBtn',function(){ 
  $("#departmentName").attr("placeholder", $departmentChoiceID);
  $("#locationName").attr("placeholder", $locationNameChoice);

  //New Personnel
  $('body').on('click','#saveNewPersonnelBtn',function(){    
    $insertFirstName = $('#newFirstName').val();
    $insertLastName = $('#newLastName').val();
    $insertJobTitle = $('#newJobTitle').val();
    $insertEmail = $('#newEmail').val();

  $.ajax({
    url: "php/insertPersonnel.php",
    type: 'POST',
    dataType: 'json',
    data: {
      firstName: $insertFirstName,
      lastName: $insertLastName,
      jobTitle: $insertJobTitle,
      email: $insertEmail,
      departmentID: $departmentChoiceID,
    },
    success: function(result) {
        if (result.status.name != "ok") {
          alert('There was a error, the ID may be taken please try again');
        } else if ($insertFirstName == '' || $insertLastName == '' || $insertEmail == ''){
          alert('There was a error, input data may be missing')
        } else {
          location.reload();
        }
  }})})})//New Personnel
})
}})//All Locations
})
}});//Departments by locations

             //**SEARCH**

$('body').on('click','#welcomeSearchBtn',function(){
  $("#welcomeHolder").css("display", "none");
  $("#locationHolder").css("display", "none");
  $("#searchHolder").css("display", "block");
  $("#departmentHolder").css("display", "none");
  $("#personnelHolder").css("display", "none");
  $("#newPersonnelBtn").css("display", "none");
  $("#newDepartmentBtn").css("display", "none");
})


//Get all locations
$.ajax({
  url: "php/getAll.php",
  type: 'POST',
  dataType: 'json',
  success: function(result) {
      if (result.status.name == "ok") {
        console.log(result)
          $(document).ready(function(){
            for (i = 0; i < result['data'].length; i++) {
              $allPersonnelID = result['data'][i]['id'];
              $allPersonnelFirstName = result['data'][i]['firstName'];
              $allPersonnelLastName = result['data'][i]['lastName'];
              $allPersonnelEmail = result['data'][i]['email'];
              $allPersonnelDepartment = result['data'][i]['department'];
              $allPersonnelLocation = result['data'][i]['location'];
              $('#personnelSearch').append('<option class="personnelSearch" id="'+$allPersonnelFirstName+'" value="'+$allPersonnelID+'" email="'+$allPersonnelEmail+'">'+$allPersonnelLastName+' '+$allPersonnelFirstName+'</option>');
              $('#personnelTableData').append('<tr value="'+$allPersonnelID+'" id="'+$allPersonnelID+'"><td value="'+$allPersonnelID+'">'+$allPersonnelFirstName+'</td><td value="'+$allPersonnelID+'">'+$allPersonnelLastName+'</td><td value="'+$allPersonnelID+'">'+$allPersonnelDepartment +'</td><td value="'+$allPersonnelID+'">'+$allPersonnelLocation+'</td></tr>');
            }
        })

        //Get all locations
        $.ajax({
          url: "php/getAllLocations.php",
          type: 'POST',
          dataType: 'json',
          success: function(result) {
              if (result.status.name == "ok") {
                  $(document).ready(function(){
                    for (i = 0; i < result['data'].length; i++) {
                      $locationID = result['data'][i]['id'];
                      $locationName = result['data'][i]['name'];
                      $('#locationSearch').append('<option class="locationSearch" value="'+$locationID+'" id="'+$locationID+'">'+$locationName+'</option>');
                  
                    }})}}})

          $('body').on('change','#locationSearch',function(){
            $locationSearchID = $(this).val();
            $('#locationTableData').html('');
            console.log($locationSearchID);

            $.ajax({
              url: "php/getAllPersonnelByLocation.php",
              type: 'POST',
              dataType: 'json',
              data: {
                id: $locationSearchID,
              },
              success: function(result) {
                for (i = 0; i < result['data'].length; i++) {
                  $allPersonnelLocID = result['data'][i]['id'];
                  $allPersonnelLocFirstName = result['data'][i]['firstName'];
                  $allPersonnelLocLastName = result['data'][i]['lastName'];
                  $allPersonnelLocEmail = result['data'][i]['email'];
                  $allPersonnelLocDepartment = result['data'][i]['department'];
                  $allPersonnelLocLocation = result['data'][i]['location'];
                  $('#locationTableData').append('<tr value="'+$allPersonnelLocID+'" id="'+$allPersonnelLocID+'"><td value="'+$allPersonnelLocID+'">'+$allPersonnelLocFirstName+'</td><td value="'+$allPersonnelLocID+'">'+$allPersonnelLocLastName+'</td><td value="'+$allPersonnelLocID+'">'+$allPersonnelLocDepartment +'</td><td value="'+$allPersonnelLocID+'">'+$allPersonnelLocLocation+'</td></tr>');
           }}})
        })

        //Filter location search
        $(document).ready(function(){
          $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#locationTableData tr").filter(function() {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
            $('#myInput').on('keyup', function() {
              var $element = $('#locationTableData');
          })
          });
        });

         //Get all departments
         $.ajax({
          url: "php/getAllDepartments.php",
          type: 'POST',
          dataType: 'json',
          success: function(result) {
              if (result.status.name == "ok") {
                  $(document).ready(function(){
                    for (i = 0; i < result['data'].length; i++) {
                      $departmentID = result['data'][i]['id'];
                      $departmentName = result['data'][i]['name'];
                      $('#departmentSearch').append('<option class="departmentSearch" value="'+$departmentID+'" id="'+$departmentID+'">'+$departmentName+'</option>');
                  
                    }})}}})

          $('body').on('change','#departmentSearch',function(){
            $departmentSearchID = $(this).val();
            $('#departmentTableData').html('');
            console.log($departmentSearchID );

            $.ajax({
              url: "php/getAllPersonnelByDepartment.php",
              type: 'POST',
              dataType: 'json',
              data: {
                id: $departmentSearchID,
              },
              success: function(result) {
                console.log(result);
                for (i = 0; i < result['data'].length; i++) {
                  $allPersonnelDepID = result['data'][i]['id'];
                  $allPersonnelDepFirstName = result['data'][i]['firstName'];
                  $allPersonnelDepLastName = result['data'][i]['lastName'];
                  $allPersonnelDepEmail = result['data'][i]['email'];
                  $allPersonnelDepDepartment = result['data'][i]['department'];
                  $allPersonnelDepLocation = result['data'][i]['location'];
                  $('#departmentTableData').append('<tr value="'+$allPersonnelDepID+'" id="'+$allPersonnelDepID+'"><td value="'+$allPersonnelDepID+'">'+$allPersonnelDepFirstName+'</td><td value="'+$allPersonnelDepID+'">'+$allPersonnelDepLastName+'</td><td value="'+$allPersonnelDepID+'">'+$allPersonnelDepDepartment +'</td><td value="'+$allPersonnelDepID+'">'+$allPersonnelDepLocation+'</td></tr>');
           }}})
        })

        //Filter department search
        $(document).ready(function(){
          $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#departmentTableData tr").filter(function() {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
            $('#myInput').on('keyup', function() {
              var $element = $('#departmentTableData');
          })
          });
        });

        //Quick search personnel popup
        $('#personnelSearch').on('change', function() {
          $dropdownPersonnelID = $(this).val();

        $('#personnelModal').modal('show');

        $.ajax({
          url: "php/getAllPersonnel.php",
          type: 'POST',
          dataType: 'json',
          data: {
            id: $dropdownPersonnelID,
          },
          success: function(result) {
              if (result.status.name == "ok") {
                $selectedQuickID = result['data'][0]['id'];
                $selectedQuickFirstName = result['data'][0]['firstName'];
                $selectedQuickLastName = result['data'][0]['lastName'];
                $selectedQuickEmail = result['data'][0]['email'];
                $selectedQuickDepartment = result['data'][0]['department'];
                $selectedQuickLocation = result['data'][0]['location'];
                $selectedQuickJobTitle = result['data'][0]['jobTitle'];
                $("#firstName").val($selectedQuickFirstName);
                $("#lastName").val($selectedQuickLastName);
                $("#email").val($selectedQuickEmail);
                $("#personelLocationName").val($selectedQuickLocation);
                $("#personelDepartmentName").val($selectedQuickDepartment); 

                //Edit quick search popup
                $('#editPersonnelBtn').on('click' ,function(){ 
                  $("#editPersonnelBtn").css("display", "none");
                  $("#editCheckBtn").css("display", "block");
                  $("#selectedPersonnelTitle").html('Personnel Edit');
                  $("#firstName").attr("disabled", false);
                  $("#lastName").attr("disabled", false);
                  $("#jobTitle").attr("disabled", false);
                  $("#email").attr("disabled", false);
                })

                //Edit Close button
                $('#editCloseBtn').on('click' ,function(){ 
                  $("#editPersonnelBtn").css("display", "block");
                  $("#saveEditPersonnelBtn").css("display", "none");
                  $("#selectedPersonnelTitle").html('Personnel');
                  $("#firstName").attr("disabled", true);
                  $("#lastName").attr("disabled", true);
                  $("#jobTitle").attr("disabled", true);
                  $("#email").attr("disabled", true);
                })

                $('body').on('click','#saveEditPersonnelBtn',function(){   
                  $firstNameVal = $("#firstName").val();
                  $lastNameVal = $("#lastName").val();
                  $jobTitleVal = $("#jobTitle").val();
                  $emailVal = $("#email").val();

                  $.ajax({
                    url: "php/editPersonnel.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                      id: $selectedQuickID,
                      firstName: $firstNameVal,
                      lastName: $lastNameVal,
                      jobTitle: $jobTitleVal,
                      email: $emailVal,
                    },
                    success: function(result) {
                      if (result.status.name != "ok") {
                        alert('There was a error, the ID may be taken please try again');
                      }else {
                        location.reload();
                    }}})
                })
        }}}) 
      })//Quick search popup

      //Filter personnel search
      $(document).ready(function(){
        $("#myInput").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#personnelTableData tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
          $('#myInput').on('keyup', function() {
            var $element = $('#personnelTableData');
            var numberOfChildren = $element.children().length;
            console.log (numberOfChildren);
        })
        });
      });

      //Filter search popup
      $(document).on('click', 'tr', function() {
        $('#personnelModal').modal('show');
        $filterPersonnal = $(this).attr('id');
        console.log($filterPersonnal);

        $.ajax({
          url: "php/getAllPersonnel.php",
          type: 'POST',
          dataType: 'json',
          data: {
            id: $filterPersonnal,
          },
          success: function(result) {
              if (result.status.name == "ok") {
                console.log(result);
                $selectedFilterID = result['data'][0]['id'];
                $selectedFilterFirstName = result['data'][0]['firstName'];
                $selectedFilterLastName = result['data'][0]['lastName'];
                $selectedFilterEmail = result['data'][0]['email'];
                $selectedFilterDepartment = result['data'][0]['department'];
                $selectedFilterLocation = result['data'][0]['location'];
                $selectedFilterJobTitle = result['data'][0]['jobTitle'];
                $("#firstName").val($selectedFilterFirstName);
                $("#lastName").val($selectedFilterLastName);
                $("#email").val($selectedFilterEmail);
                $("#personelLocationName").val($selectedFilterLocation);
                $("#personelDepartmentName").val($selectedFilterDepartment); 

                //Edit Filter search popup
                $('#editPersonnelBtn').on('click' ,function(){ 
                  $("#editPersonnelBtn").css("display", "none");
                  $("#editCheckBtn").css("display", "block");
                  $("#selectedPersonnelTitle").html('Personnel Edit');
                  $("#firstName").attr("disabled", false);
                  $("#lastName").attr("disabled", false);
                  $("#jobTitle").attr("disabled", false);
                  $("#email").attr("disabled", false);
                })

                //Edit Close button
                $('#editCloseBtn').on('click' ,function(){ 
                  $("#editPersonnelBtn").css("display", "block");
                  $("#saveEditPersonnelBtn").css("display", "none");
                  $("#selectedPersonnelTitle").html('Personnel');
                  $("#firstName").attr("disabled", true);
                  $("#lastName").attr("disabled", true);
                  $("#jobTitle").attr("disabled", true);
                  $("#email").attr("disabled", true);
                })

                $('body').on('click','#saveEditPersonnelBtn',function(){   
                  $firstNameVal = $("#firstName").val();
                  $lastNameVal = $("#lastName").val();
                  $jobTitleVal = $("#jobTitle").val();
                  $emailVal = $("#email").val();

                  $.ajax({
                    url: "php/editPersonnel.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                      id: $selectedFilterID,
                      firstName: $firstNameVal,
                      lastName: $lastNameVal,
                      jobTitle: $jobTitleVal,
                      email: $emailVal,
                    },
                    success: function(result) {
                      if (result.status.name != "ok") {
                        alert('There was a error, the ID may be taken please try again');
                      }else {
                        location.reload();
                    }}})
                })

                $('#deletePersonnelCheck').on('click' ,function(){ 
                  $('#personnelHolder').css("display", "none");
                })

                //Delete Personnel
                  $('body').on('click','#deletePersonnelBtn',function(){    

                  $.ajax({
                    url: "php/deletePersonnel.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                      id: $selectedFilterID,
                    },
                    success: function(result) {
                        if (result.status.name == "ok") {
                          location.reload();
                    }}})})//Delete Personnel
          }}}) 
      });
}}}); 


