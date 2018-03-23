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


  /*
  // Print preview document request.

  $("#btnPreview").on({
  click: function(){
      $("#printMessage").text("Request is being processed...");

      var formData = {
                        "Document": $("#frmDocument").val(),
                        "Printer": $("#frmPrinter").val(),
                        "Quantity": $("#frmQuantity").val(),
                        "Text": $("#frmText").val(),
                        "Barcode": $("#frmBarcode").val()
                      }
      var myJson = JSON.stringify(formData);

      var ajaxRequest;
      ajaxRequest = $.ajax({
        type: "POST",
        url: "http://ipl.com/Integration/PrintPreview-WS(POST)/Execute",
        contentType: "application/json",
        data: myJson,
        dataType: "text"
      });

      // show successfully for submit message
      ajaxRequest.done(function (response, textStatus, jqXHR){
        $("#printMessage").text("Preview image updated...");
        $("#preview").attr("src", "data:image/jpeg;base64," + response);
        // alert("All is a success: " + textStatus);
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
  */
});



 /* 

function postPrint() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("printMessage").innerHTML = this.responseText;
    }
  };

  document.getElementById("printMessage").innerHTML = "Request is being processed...";
  var myDocument = document.getElementById("myDocument").value;
  var myText = document.getElementById("formtext").value;
  var myBarcode = document.getElementById("formbarcode").value;
  var myPrinter = document.getElementById("formprinter").value;
  var myQuantity = document.getElementById("formquantity").value;
  var obj = {"Document": myDocument, "Printer": myPrinter, "Quantity": myQuantity, "Text": myText, "Barcode": myBarcode};
  var myJSON = JSON.stringify(obj);

  xhttp.open("POST", "http://ipl.com/Integration/PrintLabel-WS(POST)/Execute", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(myJSON);
}

function postPreview() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("preview").setAttribute("src", "data:image/jpeg;base64," + this.responseText);
      document.getElementById("printMessage").innerHTML = "Preview image updated...";
    }
  };

  document.getElementById("printMessage").innerHTML = "Request is being processed...";
  var myDocument = document.getElementById("myDocument").value;
  var myText = document.getElementById("formtext").value;
  var myBarcode = document.getElementById("formbarcode").value;
  var obj = {"Document": myDocument, "Text": myText, "Barcode": myBarcode};
  var myJSON = JSON.stringify(obj);

  xhttp.open("POST", "http://ipl.com/Integration/PrintPreview-WS(POST)/Execute", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(myJSON);
}
*/
