
var getUrlParameter = (sParam) => {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
  return false;
};

$(document).ready(function(){
  try{
    $('.loader').css("display","none")
    $('.alert').hide()
    $("#SecSubject").prop('disabled', 'disabled');
    var ticketIdVal = getUrlParameter('ticketId');
    console.log("ticketIdVal-"+ticketIdVal);
    $("#Subject").on('select2:select', function (e) {
      var SubjectCode = e.params.data.id;
      console.log("SubjectText "+SubjectCode);
      var SubjectNameArray = []
      var SubjectData = "<option value='0'></option>"
      $.getJSON( "../subjectsArr.json", function( data ) {
        //SecondarySubject
          Object.keys(data).forEach(function(k){
            console.log(k + ' - ' + data[k].SecSubject);
            //if (!SubjectNameArray.includes(data[k].SecondaryText)) {
              SubjectNameArray.push(data[k].SecSubject);
              console.log("data[k].MainSubject: "+data[k].Subject);
              if(data[k].Subject==SubjectCode){
                SubjectData += "<option value='"+data[k].Tag+"'>"+data[k].SecSubject+"</option>"
              }
              
            //}
        });
        $("#SecSubject").empty();
        $("#SecSubject").append(SubjectData);
        $("#SecSubject").prop('disabled', false);
      })
  });
  $( "#submitbtn" ).click(function() {
    $(".alert").hide();
    $('.loader').css("display","block")
    const data = {
      tag: $("#SecSubject option:selected").val(),
      ticketId: ticketIdVal
    }
    console.log("tag "+$("#SecSubject option:selected").val());
    $.ajax({
      url: 'AddTags',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (data) {
          if(data!=""){
              console.log("data: "+JSON.stringify(data));
              if(!data.success){
                      console.log("data.error: "+data.success);
                      var errorMessage = data.error
                      $('.alert-danger').html("שגיאה: "+errorMessage)
                      $('.alert-danger').show();
                      $('.loader').css("display","none")
              }else{
                      console.log("data.message: "+data.message);
                      $('.alert-success').show();
                      $("#successText").html(data.message)
                      $('.loader').css("display","none")
              }
          }
      },
      complete: function(data){
          console.log("data.message complete: "+JSON.stringify(data));
          $('.loader').css("display","none")
      }
  });
  })
  }catch(error){
    console.log("submitbtn Error: "+error);
  }
  window.onTicketLoaded = function (ticket) {
    console.log(ticket)
  }


  $('.js-example-basic-single').select2({
   "language": {
    "noResults": function(){
        return "לא נמצאו תוצאות";
        }
    }
  });
  
  
  


})