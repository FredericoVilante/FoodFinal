$(document).ready(function(){

  $("#log").click(function(){
    var query=$("#establecimento").val();
    $('#listdiv').html("");
    $.get('http://localhost:3000/establecimento/getpedidos/'+query,function(data){
      data.forEach(pedido=>{ $('#listdiv').append("<li><b>Establecimento</b>: " +pedido.usermail + " - <b>Estado</b>: "+pedido.estado+" - <b>Ementa</b>: "+pedido.ementa+"<input type='button' value='Enviar Estafeta' onclick='definirEstafeta("+'"'+pedido._id+'"'+")' ></li>")});
    });
    $.get('http://localhost:3000/establecimento/getestafetas/',function(data){
      $('#estafetas').html("");
      data.forEach(estafeta=>{ $('#estafetas').append("<option value= "+'"'+estafeta.nome+'"'+">"+estafeta.nome+"</option>")});
    });
  });
    $("#ementa").click(function(){
        var nome=$("#nome").val();
        var estab=$("#estab").val();
        var aler = document.getElementById("aler").checked;
        var desc=$("#desc").val();
        var preco=$("#preco").val();
        var tipo=$("#combo").val();
        $.post("/establecimento/newementa",{nome: nome, alergenios: aler, establecimento: estab, descrição: desc, preço: preco, tipo: tipo}, function () {
            location.replace('http://localhost:3000/establecimento')
        });
      });
      $("#estafeta").click(function(){
          var nome=$("#nomeE").val();
          var contact=$("#contacto").val();
          var zone=$("#zona").val();
          $.post("/establecimento/newestafeta",{nome: nome, zone: zone, contact: contact}, function () {
              location.replace('http://localhost:3000/establecimento')
          });
        });

  });
function definirEstafeta(id){
  var query=$("#estafetas").val();
  $.ajax({
    url: 'http://localhost:3000/establecimento/pedidoestafeta/'+query+"/"+id,
    type: 'PUT',
    success: function(response) {
      alert("Pedido A Caminho");
      location.replace('http://localhost:3000/establecimento')
    }
  });

}
