$(document).ready(
  function checkSess(){
    $.get('/account',function(){
        $("#username").attr("href","/user/logout").text("Logout");
        $("#username").text("Logout");

  })
  });
