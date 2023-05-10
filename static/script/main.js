
$(document).ready(function(){
  $("#COMPAMT").prop( "disabled", true )
  $("#COPOUNCODE").prop( "disabled", true )
  var departmentId =  ""
  $.getJSON( "files/codes.json", function( data ) {
    //console.log("json: "+ JSON.stringify(data))
    var SubjectData = "<option value='0'></option>"
    Object.keys(data).forEach(function(k){
        SubjectData += "<option value='"+data[k].Code+"'>"+data[k].Text+"</option>"
    });
    $("#CATNAME").empty();
    $("#CATNAME").append(SubjectData);
  })

window.onTicketLoaded = function (ticket) {
  console.log("newTicket: "+JSON.stringify(ticket));
  var name = ticket.participants[0].name;
  departmentId = ticket.departmentId
  var protocolType = ticket.participants[0].protocolType;
  var identifier = ticket.participants[0].identifier;
  console.log("identifier "+identifier+", protocolType "+protocolType);
  var field2 = ticket.field2? ticket.field2.slice(4) : "";
  if(field2){
    let orderNum = field2
    var data = {id: orderNum,find: "product_barcode"}
    $.ajax({
      url: `api/FindProduct`,
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (data) {
        console.log("success");
        if(data){
          console.log("data");
          if(data.data){
            var product_name = data.data.product_name
            console.log("product_name "+product_name);
            if(product_name) $( "#Subject" ).val(product_name)
            if(product_name) $( "#Subject" ).text(product_name)
            if(protocolType=="PhoneCall" || protocolType=="WhatsApp" || protocolType=="SMS" || protocolType=="WebViaSMS"){
              $("#PERSONHTEL").val(identifier)
              $("#PERSONHTEL").text(identifier)
            }else if(protocolType=="Mail"){
              $("#EMAIL").val(identifier)
              $("#EMAIL").text(identifier)
            }
          }
          //$('.alert-success').show();
          $('.loader').css("display","none") 
            
        }
        else{
          $('.alert-danger').text('אירע שגיאה');
            $('.alert-danger').show();
        }
      },
      complete: function(data){
        console.log("complete");
        $('.loader').css("display","none")
      }  
    })
  }
  //const { name, protocolType, identifier } = ticket.participants.find(participant => participant.type === 'Client')
  $("#CLIENTNAME").val(name)
  $("#CLIENTNAME").text(name)
  if(protocolType=="PhoneCall" || protocolType=="WhatsApp" || protocolType=="SMS" || protocolType=="WebViaSMS"){
    $("#PERSONHTEL").val(identifier)
    $("#PERSONHTEL").text(identifier)
  }else if(protocolType=="Mail"){
    $("#EMAIL").val(identifier)
    $("#EMAIL").text(identifier)
  }
  
 
}
  $('.js-example-basic-single').select2({
   "language": {
    "noResults": function(){
        return "לא נמצאו תוצאות";
        }
    },
    "placeholder": "נא לבחור קטגוריה"
  });
//   $( "#PRODDATE" ).datepicker({
//     beforeShow: function( input ) {
//         setTimeout(function() {
//             var headerPane = $( input )
//             .datepicker( "widget" )
//             .find( ".ui-datepicker-header" );

//             $( "<button>", {
//                 text: "X",
//                 click: function() {
//                   $( "#PRODDATE" ).hide();
//                 }
//             }).appendTo( headerPane );
//         }, 1 );
//     }
// });
  $( "#PRODDATE" ).datepicker({
    monthNames: ['ינואר','פברואר','מרץ','אפריל','מאי','יוני',
    'יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'],
    monthNamesShort: ['ינו','פבר','מרץ','אפר','מאי','יוני',
    'יולי','אוג','ספט','אוק','נוב','דצמ'],
    dayNames: ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'],
    dayNamesShort: ['א\'','ב\'','ג\'','ד\'','ה\'','ו\'','שבת'],
    dayNamesMin: ['א\'','ב\'','ג\'','ד\'','ה\'','ו\'','שבת'],
    dateFormat: 'dd/mm/yy',
    isRTL: true,
    changeYear: true,
    changeMonth: true,
    showButtonPanel: true,
    closeText: 'סגור'
  });
 
  $(".alert").hide();
  $("#orderNumRow").hide()
  $("#BarcodeNumRow").hide()
  $('.loader').css("display","none")

  $( "#orderNum" ).click(function() {
    $("#orderNumRow").show()
    $("#BarcodeNumRow").hide()
    $(".fields").hide()
  })
  $( "#BarcodeNum" ).click(function() {
    $("#orderNumRow").hide()
    $("#BarcodeNumRow").show()
    $(".fields").show()
  })
  //var mydata = JSON.parse(ProductsList);
  //alert(mydata[0].Product_id)
  var Products = [
    { "Product_id":"001",
     "Product_name":"name_Product1",
     "Product_barcode": "12345678912541",
     "Product_department_id": 155,
     "Product_category_id": "102",
     "Product_no": 555
    },
    { "Product_id": "002",
      "Product_name":"2 בדיקה סנו",
      "Product_barcode": "12345678912542",
      "Product_department_id": 155,
      "Product_category_id": "102",
      "Product_no": 666
    }
  ]
     
 $("#COMPDESC").change(function(){
  var selectedRefund = $("#COMPDESC option:selected" ).val()
  if (selectedRefund == 0){
    $("#COMPAMT").removeClass('borderClass')
    $("#COPOUNCODE").removeClass('borderClass')
    $("#COMPAMT").prop( "disabled", true )
    $("#COPOUNCODE").prop( "disabled", true )
  }else{
    if(selectedRefund == 8){
      $("#COPOUNCODE").addClass('borderClass')
      $("#COPOUNCODE").prop( "disabled", false )
      $("#COPOUNCODE").prop('required',true);
    }else{
      $("#COPOUNCODE").removeClass('borderClass')
      $("#COPOUNCODE").prop( "disabled", true )
    }
    $("#COMPAMT").addClass('borderClass')
    $("#COMPAMT").prop( "disabled", false )
    $("#COMPAMT").prop('required',true);
  }
 })
 $("#fileName").change(function(){
  var selectedfile = $("#fileName option:selected" ).val()
  if(selectedfile == "" || selectedfile == 0){
      $("#Subject").removeClass('borderClass')
      $("#CLIENTNAME").removeClass('borderClass')
      $("#PERSONCITY").removeClass('borderClass')
      $("#PERSONSTRT").removeClass('borderClass')
  }else{
    $("#CLIENTNAME").addClass('borderClass')
    $("#PERSONCITY").addClass('borderClass')
    $("#PERSONSTRT").addClass('borderClass')
    $("#Subject").addClass('borderClass')

  }
 })
  $( "#BARCODE" ).change(function() {
    let orderNum = $( "#BARCODE" ).val()
    var data = {id: orderNum,find: "product_barcode"}
    $.ajax({
      url: `api/FindProduct`,
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (data) {
        console.log("success");
        if(data){
          console.log("data");
          if(data.data){
            var product_name = data.data.product_name
            console.log("product_name "+product_name);
            if(product_name) $( "#PRODNAME" ).val(product_name)
          }
          //$('.alert-success').show();
          $('.loader').css("display","none") 
            
        }
        else{
          $('.alert-danger').text('אירע שגיאה');
            $('.alert-danger').show();
        }
      },
      complete: function(data){
        console.log("complete");
        $('.loader').css("display","none")
      }  
    })
    
    //var { Product_name } = Products.find(i => i.Product_barcode === orderNum)
    
  });

  // if(Object.keys(mydata).length>1)
  // mydata.forEach(async obj => {
  //       const tagInfo = await getTagsId(obj)
  //       tagsIds[num] = tagInfo.data.create_or_get_tag.id
  //       console.log(tagsIds);
  //       num++
  //   })
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
  $( "#submitbtn" ).click(function() {
    try{
      $(".alert").hide();
      var selectedCategory = $("#CATNAME option:selected" ).val()
      if (selectedCategory == ""){
        $('.alert-danger').text('חובה לבחור קטגוריה');
        $('.alert-danger').show();
      }else{
        var ticketIdVal = getUrlParameter('ticketId');
        const Num = $('input[name="flexRadioDefault"]:checked').attr('id');
        const NumOrder = Num=='orderNum' ? $('#ORDER').val() : $('#BARCODE').val()
        if(ticketIdVal){
          $('.loader').css("display","block")
          var nameProd = $('#PRODNAME').val()
          var data = {
            field3: $("#CATNAME option:selected" ).text(),
            field2: NumOrder,
            field5: $('#NO_BATCH').val(),
            field6: $('#PRDCTTIME').val(),
            field7: $('#PRODDATE').val(),
            field8: $("#CATNAME option:selected" ).val(),
            nameProd: nameProd,
            numberOf: Num,
            departmentId: `${departmentId}`
          }
          console.log("departmentId"+departmentId);
          $( "#Subject" ).val(nameProd)
          $( "#Subject" ).text(nameProd)
          console.log(data);
          $.ajax({
            url: `api/setFields/${ticketIdVal}`,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data) {
              if(!data){
                  $('.alert-danger').text('אירע שגיאה');
                  $('.alert-danger').show();
              }
              else{
                $('.alert-success').show();
                $('.loader').css("display","none") 
              }
            },
            complete: function(data){
              $('.loader').css("display","none")
            }  
          })
          const PRODNAME = $('#PRODNAME').val()
        }
      }
    }catch(error){
      console.log("submitbtn Error: "+error);
    }
  })
function SendToSanoFunc(dataSano){
  $.ajax({
    url: `https://as400api.sano.co.il/glassix`,
    type: 'post',
    headers: { APIKEY: `9271882d-22bd-4484-b99b-b91a3fa1bbf7`,contentType: 'application/json' },
    data: JSON.stringify(dataSano),
    success: function (data) {
      if(data){
        console.log("dataSent"+data);
      }
    },
    error: function (data) {
      console.log("error dataSent"+data);
    },
    complete: function(data){
      $('.loader').css("display","none")
    }  
  })
}
  $( "#submitbtn2" ).click(function() {
    try{
      $(".alert").hide();
      selectedRefund = $("#COMPDESC option:selected" ).val()
      selectedFile = $("#fileName option:selected" ).val()
    if (selectedRefund != 0 && $("#COMPAMT").val()==""){
      $('.alert-danger').text('חובה למלא שדה - סכום פיצוי');
      $('.alert-danger').show();
    }else if(selectedRefund == 8 && $("#COPOUNCODE").val()==""){
      $('.alert-danger').text('חובה למלא שדה - קוד קופון ');
      $('.alert-danger').show();
    }else if($("#CLIENTNAME").val()==""){
      $('.alert-danger').text('חובה למלא שם לקוח');
      $('.alert-danger').show();
    }else if(selectedFile==""){
      $('.alert-danger').text('חובה למלא שדה - שם המסמך ');
      $('.alert-danger').show();
    }else if(selectedFile=="3593" && ($("#PERSONCITY").val()=="" || $("#PERSONSTRT").val()=="")){
        $('.alert-danger').text('חובה למלא את השדות - עיר וכתובת');
        $('.alert-danger').show();
    }else if((selectedFile=="3596" || selectedFile=="3597") && ($("#PERSONCITY").val()=="" || $("#PERSONSTRT").val()=="" || $("#Subject").val()=="")){
      $('.alert-danger').text('חובה למלא את השדות -  עיר, כתובת ושם פריט');
      $('.alert-danger').show();
    }else{
      var sendToSano = {}
      var ticketIdVal = getUrlParameter('ticketId');
      if(ticketIdVal){
        $('.loader').css("display","block")
        var address = $('#PERSONSTRT').val()+", "+$('#PERSONCITY').val()
        var data = {
          field10: $('#COMPAMT').val(), //payment amount
          COMPDESC : $("#COMPDESC option:selected" ).text(),
          PERSONCITY : $('#PERSONCITY').val(),
          PERSONSTRT : $('#PERSONSTRT').val(),
          ZIPCODE : $('#ZIPCODE').val(),
          PERSONHTEL : $('#PERSONHTEL').val(),
          EMAIL : $('#EMAIL').val(),
          CLIENTNAME : $('#CLIENTNAME').val(),
          COPOUNCODE : $('#COPOUNCODE').val(),
          /***** form data *****/
          formId : $('#fileName option:selected').val(),
          formtext : $('#fileName option:selected').text(),
          address : address,
          subject : $('#Subject').val(),
          departmentId : departmentId
        }
        $.ajax({
          url: `api/setFields/${ticketIdVal}`,
          type: 'post',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify(data),
          success: function (data) {
            console.log("success");
            $('.loader').css("display","none") 
            if(!data){
                $('.alert-danger').text('אירע שגיאה');
                $('.alert-danger').show();
            }
            else{
              $('.alert-success').show();
              console.log("data"+JSON.stringify(data));
            }
          },
          complete: function(data){
            console.log("complete");
            $('.loader').css("display","none")
            $('.alert-success').show();
          }  
        })
      }
    }
    }catch(error){
      console.log("submitbtn Error: "+error);
    }
  })

})