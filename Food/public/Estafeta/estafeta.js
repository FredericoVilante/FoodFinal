$(document).ready(

  function(){

    $("#log").click(function(){
      var pedido="";
      var query=$("#nome").val();
      $('#lista').html("");
      $.get('http://localhost:3000/estafeta/pedido/'+query,function(data){
        console.log(data);
        if(data==null){

        }else{
          $.get('http://localhost:3000/estafeta/pedidodoestafeta/'+data,function(data){
            console.log(data);
            $('#lista').append("<li><b>Establecimento</b>: " +data.usermail + " - <b>Estado</b>: "+data.estado+" - <b>Ementa</b>: "+data.ementa+"<input type='button' value='Fechar' onclick='fechar("+'"'+data._id+'"'+")' ></li>");
          });
      }
      });

    });


  });
  function fechar(id){
    var query=$("#nome").val();
    $.ajax({
      url: 'http://localhost:3000/estafeta/fechar/'+id+"/"+query,
      type: 'PUT',
      success: function(response) {
        alert("Pedido Fechado");
      }
    });

  }
