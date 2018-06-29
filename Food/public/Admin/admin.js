$(document).ready(

  function(){
    $("#estab").click(function(){

        var nomeestab=$("#nomeestab").val();
        var address=$("#address").val();
        var zone=$("#zone").val();
        var contact=$("#contact").val();
        var NIF=$("#NIF").val();
        $.post("/admin/newestablecimento",{nome: nomeestab, zone: zone, address: address, contact: contact, NIF: NIF}, function () {
            alert("sucesso");

        });

      });


  });
