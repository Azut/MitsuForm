/*
*   Send ajax requests to Integration Platform to print or preview a BarTender document.
*   The request uses the POST method and contains JSON data.  The response gives confirmation
*   of the print request or a preview image data which is base 64 encoded.  This is then set
*   to the source of the message text element or preview image element in the web page.
*/

$(document).ready(function(){

  // Print Document request.

  $("#btnPrint").on({
      click: function(){
          $("#printMessage").text("Request is being processed...");

          var formData = {
                            "documento": $("#frmDocumento").val(),
                            "numeroCopias": $("#frmCantidad").val(),
                            "geometria": $("#geometria").val(),
                            "calidad": $("#calidad").val(),
							"lote": $("#lote").val()
                          }
          var myJson = JSON.stringify(formData);

          var ajaxRequest;
          ajaxRequest = $.ajax({
            type: "POST",
            url: "http://framospc2.corp.seagullscientific.com:8080/Integration/MitsubishiAJAX/Execute",
            contentType: "application/json",
            data: myJson,
            dataType: "text"
          });

          // show successfully for submit message
          ajaxRequest.done(function (response, textStatus, jqXHR){
            $("#printMessage").text(response);
            // alert("All is a success: " + textStatus);
            $("#frmFormulario")[0].reset();
            // Reseteo de formulario en PRUEBAS.
          });

          // On failure of request this function will be called and show error
          ajaxRequest.fail(function(response, textStatus, jqXHR){
            alert("There was an error: " + textStatus);
          });

          // Always do this
          ajaxRequest.always(function(){
            // alert("You will always see this message.");
          });
      }
  });
});