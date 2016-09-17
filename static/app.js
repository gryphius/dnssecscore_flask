var main = function() {
    $('#Secure').hide();
    $('#Insecure').hide();
    
  var scoreOutput = function (response) {
      var result = response.result;
      var score = document.createTextNode(response.score);
      
      console.log(result);
      if(result==="Secure"){
          document.getElementById('securevalue').appendChild(score);
          $('#Secure').show();
      }
      else if(result==="Insecure"){
          $('#Insecure').show();
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
              scoreOutput(response)
          },
          error: function(error) {
              console.log(error);
          }


  });
});
}

$(document).ready(main);