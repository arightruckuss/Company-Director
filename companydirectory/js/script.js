$("#myInput").on("click", function(){
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

$('#perFixedLink').on('click' ,function(){ 
  $("#searchHolder").css("display", "block");
  $("#plusPersonnsel").css("display", "block");
  $("#locationHolder").css("display", "none");
  $("#departmentHolder").css("display", "none");
  $("#perFixedLink").css("display", "none");
  $("#deptFixedLink").css("display", "block");
  $("#locFixedLink").css("display", "block");
  $("#myInput").css("display", "block");
})

$('#deptFixedLink').on('click' ,function(){ 
  $("#departmentHolder").css("display", "block");
  $("#plusPersonnsel").css("display", "none");
  $("#searchHolder").css("display", "none");
  $("#locationHolder").css("display", "none");
  $("#perFixedLink").css("display", "block");
  $("#deptFixedLink").css("display", "none");
  $("#locFixedLink").css("display", "block");
  $("#myInput").css("display", "none");

})

$('#locFixedLink').on('click' ,function(){ 
  $("#locationHolder").css("display", "block");
  $("#plusPersonnsel").css("display", "none");
  $("#searchHolder").css("display", "none");
  $("#departmentHolder").css("display", "none");
  $("#perFixedLink").css("display", "block");
  $("#deptFixedLink").css("display", "block");
  $("#locFixedLink").css("display", "none");
  $("#myInput").css("display", "none");
})

$('body').on('click','#closeDeleteBtn',function(){  
  location.reload();
})

  //**DEPARTMENTS**
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
            $('#departmentList').append('<div class="d-grid gap-2 col-6 mx-auto"><button class="btn btn-secondary departmentList" data-bs-toggle="modal" data-bs-target="#departmentModal" type="button" value="'+$departmentID+'" id="'+$departmentID+'">'+$departmentName+'</button></div>');
            $('#newPersonneldepartment').append('<option class="newDepartmentSearch" value="'+$departmentID+'" id="'+$departmentID+'">'+$departmentName+'</option>');
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
        $('#departmentTableData').append('<tr value="'+$allPersonnelDepID+'" id="'+$allPersonnelDepID+'"><td value="'+$allPersonnelDepID+'">'+$allPersonnelDepFirstName+', '+$allPersonnelDepLastName+'<br><span id="personnelDep">'+$allPersonnelDepDepartment+'</span><span id="personnelLoc"> '+$allPersonnelDepLocation+'</span></td></tr>');
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

//Department popup
$('body').on('click','.departmentList',function(){  
  $departmentSelected = $(this).html();
  $departmentSelectedID = $(this).val();
  $('#selectedDepartmentName').attr('placeholder', $departmentSelected);

$('#editDepartmentBtn').on('click' ,function(){ 
  $("#editDepartmentBtn").css("display", "none");
  $("#editDepartmentCheckBtn").css("display", "block");
  $("deleteDeptCheckBtn").css("display", "none");
  $("#selectedDepartmentTitle").html('Personnel Edit');
  $("#deleteDepartmentCheckBt").css("display", "none");
  $("#departmentTitle").html('Department Edit');
  $('#selectedDepartmentName').attr('disabled', false);
  $("#selectedDepartmentName").val($departmentSelected);
  $("#deleteDeptUnableBtn").hide();

//Edit Department button
  $('body').on('click','#saveEditDepartmentBtn',function(){    
    $editDepartmentName = $("#selectedDepartmentName").val();

    $.ajax({
      url: "php/editDepartment.php",
      type: 'POST',
      dataType: 'json',
      data: {
        id: $departmentSelectedID,
        name: $editDepartmentName,
      },
      success: function(result) {
        if (result.status.name != "ok") {
          alert('There was a error, the ID may be taken please try again');
        }else {
          setTimeout('location.reload();', 2000);
      }}})})
  })});

$('body').on('click','.editDepartmentCloseBtn',function(){ 
  $("#editDepartmentBtn").css("display", "block");
  $("#editDepartmentCheckBtn").css("display", "none");
  $("#departmentTitle").html('Department');
  $('#selectedDepartmentName').attr('disabled', true);
  $("#editDepartmentCheckBtn").css("display", "none");
  $("#deleteDeptUnableBtn").show();
});

//New Department
$('body').on('click','#saveNewDepartmentBtn',function(){   
  $newDepartmentName = $('#newDepartmentName').val();
  console.log($newDepartmentName);
  $newLocationID = $('#newDepartmentLocation').val();
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
          setTimeout('location.reload();', 2000);
    }}})//New location
  })
  

$('body').on('click','#deleteDepartmentBtn',function(){    

  $.ajax({
    url: "php/deleteDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: $departmentSelectedID,
    },
    success: function(result) {
      if (result.status.name != "ok") {
        alert('There was a error, there may be departments in this location');
      }else {
        setTimeout('location.reload();', 2000);
  }}})})//Delete Location

    //**LOCATION**

$('body').on('click','.locationClose',function(){
  $("#editLocationBtn").css('display', 'block');
  $("#editLocationCheckBtn").css('display', 'none');
  $("#deleteLocationCheckBtn").css('display', 'block');
  $("#editLocationName").attr("disabled", true);
  $("#locationTitle").html('Location');
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
              $('#locationList').append('<div class="d-grid gap-2 col-6 mx-auto"><button class="btn btn-secondary locationList" data-bs-toggle="modal" data-bs-target="#locationModal" type="button" id="'+$locationID+'" name="'+$locationName+'">'+$locationName+'</button></div>');
            }})} 

}});

//Get all Personnel Data
$.ajax({
  url: "php/getAll.php",
  type: 'POST',
  dataType: 'json',
  success: function(result) {
      if (result.status.name == "ok") {
          $(document).ready(function(){
            for (i = 0; i < result['data'].length; i++) {
              $allPersonnelID = result['data'][i]['id'];
              $allPersonnelFirstName = result['data'][i]['firstName'];
              $allPersonnelLastName = result['data'][i]['lastName'];
              $allPersonnelEmail = result['data'][i]['email'];
              $allPersonnelDepartment = result['data'][i]['department'];
              $allPersonnelLocation = result['data'][i]['location'];
              $('#personnelSearch').append('<option class="personnelSearch" id="'+$allPersonnelFirstName+'" value="'+$allPersonnelID+'" email="'+$allPersonnelEmail+'">'+$allPersonnelLastName+' '+$allPersonnelFirstName+'</option>');
              $('#personnelTableData').append('<tr value="'+$allPersonnelID+'" id="'+$allPersonnelID+'"><td value="'+$allPersonnelID+'">'+$allPersonnelLastName+', '+$allPersonnelFirstName+'<br><span id="personnelDep">'+$allPersonnelDepartment+'</span><span id="personnelLoc"> '+$allPersonnelLocation+'</span></td></tr>');
              $('#departmentTableData').append('<tr value="'+$allPersonnelID+'" id="'+$allPersonnelID+'"><td value="'+$allPersonnelID+'">'+$allPersonnelLastName+', '+$allPersonnelFirstName+'<br><span id="personnelDep">'+$allPersonnelDepartment+'</span><span id="personnelLoc"> '+$allPersonnelLocation+'</span></td></tr>');
              $('#locationTableData').append('<tr value="'+$allPersonnelID+'" id="'+$allPersonnelID+'"><td value="'+$allPersonnelID+'">'+$allPersonnelLastName+', '+$allPersonnelFirstName+'<br><span id="personnelDep">'+$allPersonnelDepartment+'</span><span id="personnelLoc"> '+$allPersonnelLocation+'</span></td></tr>');
            }
        })

}}}); 

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
              $('#locationSearch').append('<option class="locationSearch" value="'+$locationID+'" id="'+$locationID+'" name="'+$locationName+'">'+$locationName+'</option>');
              $('#newDepartmentLocation').append('<option class="locationSearch" value="'+$locationID+'" id="'+$locationID+'" name="'+$locationName+'">'+$locationName+'</option>');
            }})}}})

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

    //**PERSONNEL**

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

  }}}) 
})

//Filter search popup
$(document).on('click', 'tr', function() {
  $('#personnelModal').modal('show');
  $filterPersonnal = $(this).attr('id');

  $.ajax({
    url: "php/getAllPersonnel.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: $filterPersonnal,
    },
    success: function(result) {
        if (result.status.name == "ok") {
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

    }}}) 
});

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
  })
  });
});

//New department choice ID
$('#newPersonneldepartment').on('change' ,function(){ 
  $newDepartmentID = $(this).val();
  console.log($newDepartmentID)

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
        departmentID: $newDepartmentID,
      },
      success: function(result) {
          if (result.status.name != "ok") {
            alert('There was a error, the ID may be taken please try again');
          } else if ($insertFirstName == null || $insertLastName == null || $insertEmail == null){
            alert('There was a error, input data may be missing')
          } else {
            setTimeout('location.reload();', 2000);
          }
  }})})});

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
          setTimeout('location.reload();', 2000);
    }}})})

$('#deletePersonnelCheck').on('click' ,function(){ 
  $('#personnelHolder').css("display", "none");
})

//Personnel Close btn
$('.editPersonnelCloseBtn').on('click' ,function(){ 
  location.reload();
})

$('body').on('click','#deletePersonnelCheckBtn',function(){  
  $("#personnelModal").modal('hide');
  $("#departmentModal").css("display", "none");
  $("#locationModal").modal('hide');
  $("#editPersonnelCheckBtn").css("display", "none");
})

//Edit Personnel check btn
$('body').on('click','#editPersonnelCheckBtn',function(){  
  $("#personnelModal").modal('hide');
  $("#editPersonnelCheckBtn").css("display", "none");
  $("#deletePersonnelCheckBtn").css("display", "none");
})


//Edit Personnel btn
$('#editPersonnelBtn').on('click' ,function(){ 
  $("#deletePersonnelCheckBtn").css("display", "none");
  $("#editPersonnelBtn").css("display", "none");
  $("#editPersonnelCheckBtn").css("display", "block");
  $("#personelDepartmentBox").css("display", "none");
  $("#editPersonelDepartmentBox").css("display", "block");
  $("#personelLocationBox").css("display", "none");
  $("#editPersonelLocationBox").css("display", "block");
  $("#selectedPersonnelTitle").html('Personnel Edit');
  $("#firstName").attr("disabled", false);
  $("#lastName").attr("disabled", false);
  $("#jobTitle").attr("disabled", false);
  $("#email").attr("disabled", false);
  $("#personelDepartmentName").attr("disabled", false);
  $("#personelLocationName").attr("disabled", false);

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
                $('#editDepartmentSearch').append('<option class="departmentSearch" value="'+$departmentID+'" id="'+$departmentID+'">'+$departmentName+'</option>');
            
              }})}}})

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
                $('#editLocationSearch').append('<option class="locationSearch" value="'+$locationID+'" id="'+$locationID+'">'+$locationName+'</option>');
            
              }})}}})
})

$('body').on('change','#editLocationSearch',function(){    
  $locationSelected = $(this).val();
  console.log($locationSelected)
})


$('body').on('click','#saveEditPersonnelBtn',function(){   
  $firstNameVal = $("#firstName").val();
  $lastNameVal = $("#lastName").val();
  $jobTitleVal = $("#jobTitle").val();
  $emailVal = $("#email").val();
  $departmentSelected = $('#editDepartmentSearch').val();
  console.log($departmentSelected)

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
      department: $departmentSelected,
    },
    success: function(result) {
      if (result.status.name != "ok") {
        alert('There was a error');
      }else {
        console.log('w')
    }}})
})


  //**LOCATION**

$('body').on('click','.locationList',function(){  
  $locationSelected = $(this).html();
  $locationSelectedID = $(this).attr('id');
  $('#editLocationName').val($locationSelected);
  console.log($locationSelected);
  $.ajax({
    url: "php/getDepartmentByLocID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: $locationSelectedID,
    },
    success: function(result) {
        if (result.status.name == "ok") {
          console.log(result)
          if(result['data'][0] == undefined) {
            $("#deleteLocUnableBtn").css("display", "none");
            $("#deleteLocationCheckBtn").css("display", "block");
          } else {
            $("#deleteLocationCheckBtn").css("display", "none");
            $("#deleteLocUnableBtn").css("display", "block");
          }
        }}})})

$('body').on('click','.locationList',function(){  
  $( "#newLocationBtn" ).hide();
  $( "#newDepartmentBtn" ).css('display', 'block');
});

$('body').on('click','.departmentList',function(){  
  $departmentSelected = $(this).html();
  $departmentSelectedID = $(this).attr('id');
  $.ajax({
    url: "php/getAllPersonnelByDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: $departmentSelectedID,
    },
    success: function(result) {
        if (result.status.name == "ok") {
          if(result['data'][0] == undefined) {
            $("#deleteDeptUnableBtn").css("display", "none");
            $("#deleteDeptCheckBtn").css("display", "block");
          } else {
            $("deleteDeptCheckBtn").css("display", "none");
            $("#deleteDeptUnableBtn").css("display", "block");
          }
        }}})})

//Delete Location
$('body').on('click','#deleteLocationBtn',function(){    

  $.ajax({
    url: "php/deleteLocation.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: $locationSelectedID,
    },
    success: function(result) {
      if (result.status.name != "ok") {
        alert('There was a error, there may be departments in this location');
      }else {
        setTimeout('location.reload();', 2000);

    }}})})//Delete Location
  
//Edit location
$('body').on('click','#saveEditLocationBtn',function(){    
  $editLocationName = $("#editLocationName").val();
  $.ajax({
    url: "php/editLocation.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: $locationSelectedID,
      name: $editLocationName,
    },
    success: function(result) {
      if (result.status.name != "ok") {
        alert('There was a error, the ID may be taken please try again');
      }else {
        alert('done');
    }}})
  })

$('body').on('change','#locationSearch',function(){
  $locationSearchID = $(this).val();
  
  $('#selectLocationList').html();
  $('#locationTableData').html('');

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
        $('#locationTableData').append('<tr value="'+$allPersonnelLocID+'" id="'+$allPersonnelLocID+'"><td value="'+$allPersonnelLocID+'">'+$allPersonnelLocFirstName+', '+$allPersonnelLocLastName+'<br><span id="personnelDep">'+$allPersonnelLocDepartment+'</span><span id="personnelLoc"> '+$allPersonnelLocLocation+'</span></td></tr>');
 }}})
})

//Edit Location
$('body').on('click','#editLocationBtn',function(){  
  $("#editLocationName").attr("disabled", false);
  $("#editLocationBtn").css('display', 'none');
  $("#deleteLocUnableBtn").css('display', 'none');
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
          setTimeout(location.reload(),4000)
    }}})  
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
        setTimeout('location.reload();', 2000);
  }}})//New location
})

$(document).ready(function () {
  $('#saveNewPersonnelBtn').click(function () {
    $('#newPersonnelSuccessBox').show('fade');
  });
  $('#newPersonnelCloseBox').click(function () {
    $('#newPersonnelSuccessBox').hide('fade');
  })
});

$(document).ready(function() {
  $('#deletePersonnelBtn').click(function() {
    $('#deletePersonnelSuccessBox').show('fade');
  })
})

$(document).ready(function () {
  $('#saveNewLocationBtn').click(function () {
    $('#newLocSuccessBox').show('fade');
  });
});

$(document).ready(function() {
  $('#deleteLocationBtn').click(function() {
    $('#deleteLocSuccessBox').show('fade');
  })
})

$(document).ready(function () {
  $('#saveNewDepartmentBtn').click(function () {
    $('#newDeptSuccessBox').show('fade');
  });
});

$(document).ready(function() {
  $('#deleteDepartmentBtn').click(function() {
    $('#deleteDeptSuccessBox').show('fade');
  })
})

$(document).ready(function() {
  $('#deleteDeptUnableBtn').click(function() {
    $('#deleteDeptUnableBox').show('fade');
    setTimeout('$("#deleteDeptUnableBox").hide("fade");', 4000);
  })
  $('#closeDeptUnableBox').click(function () {
    $('#deleteDeptUnableBox').hide('fade');
  })
})

$(document).ready(function() {
  $('#deleteLocUnableBtn').click(function() {
    $('#deleteLocUnableBox').show('fade');
    setTimeout('$("#deleteLocUnableBox").hide("fade");', 4000);
  })
  $('#closeLocUnableBox').click(function () {
    $('#deleteLocUnableBox').hide('fade');
  })
})

$(document).ready(function() {
  $('#saveEditPersonnelBtn').click(function() {
    $('#editPersonnelSuccessBox').show('fade');
    setTimeout('$("#editPersonnelSuccessBox").hide("fade");', 4000);
  })
})

$(document).ready(function() {
  $('#saveEditDepartmentBtn').click(function() {
    $('#editDeptSuccessBox').show('fade');
    setTimeout('$("#editDeptSuccessBox").hide("fade");', 4000);
  })
})

$('body').on('change','#locationSearch',function(){  
  $locationSearchName = $(this).attr('id');
  console.log($locationSearchName);
})









            





