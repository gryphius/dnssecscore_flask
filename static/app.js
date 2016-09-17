var main = function() {
    $('#Secure').hide();
    $('#Insecure').hide();
    $('#testResults').hide();
    
  var scoreOutput = function (response) {
      var result = response.result;
      var score = response.score;
      element = document.getElementById('securevalue')

      console.log(result);
      if(result==="Secure"){
          element.innerHTML = score + "%";
          $('#Secure').show();
      }
      else if(result==="Insecure"){
          $('#Insecure').show();
      }
  };

  var testOutput = function (response) {
      $('#testResults').show();
      var tests = response.tests;
      var progressbars = {'good': '"progress-bar progress-bar-success"', 'neutral': '"progress-bar progress-bar-info"',
      'bad':'"progress-bar progress-bar-warning"','warning':'"progress-bar progress-bar-danger"'}
      // var barcolors = {'good': '0088CC', 'neutral': '51A351', 'bad': 'F89406', 'warning': 'BD362F'}
      console.log(tests);
      for(i=0; i<tests.length; i++){
          console.log(progressbars[(tests[i].result_type)]);
          $('#testResults').append($( "<div class='well' >" + "<p style='font-size:14px; font-weight:bold;'>" + tests[i].name + "</p>" +
                  "<p style='font-size:14px;'>" + tests[i].messages + "</p>" +
                  "<div class=" + progressbars[tests[i].result_type] + " role='progressbar' aria-valuenow='40'aria-valuemin='0' aria-valuemax='100' style='width:100%'>"
              + "result type: " + tests[i].result_type  +"</div>" +
              "</div>" ))
      }

  };
    
  $('button').click(function() {
      $('#Secure').hide();
      $('#Insecure').hide();
      var domainname = $('#txtDomain').val();
      $.ajax({
          url: '/domain_submitted',
          data: $('form').serialize(),
          type: 'POST',
          success: function(response) {
              console.log(response);
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