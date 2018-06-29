$(document).ready(

//Inserir Utilizador

  function(){
    $("#submit").click(function(){
     console.log("start");
       var check = document.getElementById("terms").checked;

       if (check == false)
        return alert('Check terms and Conditions');

        var mailinput=$("#mail").val();
        var passinput=$("#pass").val();
        var addressinput=$("#address").val();
        var contactinput=$("#contact").val();
        $.post("http://localhost:3000/user/newuser",{mail: mailinput, password: passinput, address: addressinput, contact: contactinput}, function () {
            location.replace('http://localhost:3000/login')

        });

      });

	$("#log").click(function(){
      console.log("Get Gestor");
      var mail=$("#login-email").val();
      var pass=$("#login-password").val();
      $.post("http://localhost:3000/user/login",{mail: mail, password: pass}, function (res) {
				if(res=="true"){
	        location.replace('http://localhost:3000/user/menu');
				}else if(res=="false"){
          console.log("Get Gestor");
          alert("Wrong email/password");
        }
        });
    });

    });
