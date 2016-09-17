var main = function() {
    $('#Secure').hide();
    $('#Insecure').hide();
    $('#testResults').hide();
    $('#FTE').hide();

/*  $("#inputfield").keyup(function(event){
      console.log("keypresses");
    if(event.keyCode === 13){
        console.log("detected enter press");
        $('#dnsbutton').click();
    }
  });*/

    document.getElementById('inputfield').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      // Enter pressed
      $('#dnsbutton').click();
      return false;
    }
  };
    

    document.getElementById('inputfield').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      // Enter pressed
      $('#dnsbutton').click();
      return false;
    }
  };
    
  var scoreOutput = function (response) {
      var result = response.result;
      var score = response.score;
      element = document.getElementById('securevalue');
      FTEtext = document.getElementById('FTEtext');

      console.log(result);
      if(result==="Secure"){
          element.innerHTML = score + "%";
          $('#Secure').show();
      }
      else if(result==="Insecure"){
          $('#Insecure').show();
      }

      else{
          $('#FTE').show();
          console.log(result);
          FTEtext.innerHTML = result;

      }
  };

  var testOutput = function (response) {
      $('#testResults').show();
      var tests = response.tests;
      var progressbars = {'good': '"progress-bar progress-bar-success"', 'neutral': '"progress-bar progress-bar-info"',
      'bad':'"progress-bar progress-bar-danger"','warning':'"progress-bar progress-bar-warning"'}
      for(i=0; i<tests.length; i++){
          console.log(progressbars[(tests[i].result_type)]);
          $('#testResults').append($( "<div class='well' >" + "<p style='font-size:14px; font-weight:bold;'>" + tests[i].name + "</p>" +
                  "<p style='font-size:14px;'>" + tests[i].messages + "</p>" +
                  "<div class=" + progressbars[tests[i].result_type] + " role='progressbar' aria-valuenow='40'aria-valuemin='0' aria-valuemax='100' style='width:100%'>"
               + tests[i].result_type  +"</div>" +
              "</div>" ))
      }

  };

    
  $('button').click(function() {
      $('#Secure').hide();
      $('#Insecure').hide();
      var domainname = $('#txtDomain').val();
      var testOutputs = document.getElementById('testResults');
      if (testOutputs.innerHTML != null) {
          testOutputs.innerHTML = null
      }
      $.ajax({
          url: '/domain_submitted',
          data: $('form').serialize(),
          type: 'POST',
          success: function(response) {
              scoreOutput(response);
              testOutput(response);
          },
          error: function(error) {
              console.log(error);
          }


  });
});
}

$(document).ready(main);