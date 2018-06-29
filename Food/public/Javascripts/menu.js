var arrayPedido = [];
$(document).ready(
  function(){
    $("#estab").click(function(){
      $.get("/user/listestablecimentos", function (data) {
        $('#listdiv').html("");
        data.forEach(estab=>{ $('#listdiv').append("<li><b>Name</b>: " +estab.nome + " - <b>Address</b>: "+estab.address+" - <b>Contact</b>: "
        +estab.contact+"<input type='button' value='Ver Ementas' onclick='pesq("+'"'+estab.nome+'"'+")'></li>")});
      })
    });
    $("#ementas").click(function(){
      $.get("/user/listementas", function (data) {
        $('#listdiv').html("");
        data.forEach(ementa=>{ $('#listdiv').append("<li><b>Name</b>: " +ementa.nome + " - <b>Establecimento</b>: "+ementa.establecimento+" - <b>Descrição</b>: "
        +ementa.descrição+" - <b>Preço</b>: "+ementa.preço+"<input type='button' value='Adicionar' onclick='add("+'"'+ementa.nome+'"'+','+'"'+ementa.establecimento+'"'+','+'"'+ementa.preço+'"'+")'></li>")});
      })
    });
    $("#pesqestab").click(function(){
      var query = $('#txtbox').val();
      $.get("/user/ementasdoestablecimento/"+query, function (data) {
        $('#listdiv').html("");
        data.forEach(ementa=>{ $('#listdiv').append("<li><b>Name</b>: " +ementa.nome + " - <b>Establecimento</b>: "+ementa.establecimento+" - <b>Descrição</b>: "
        +ementa.descrição+" - <b>Preço</b>: "+ementa.preço+"<input type='button' value='Adicionar' onclick='add("+'"'+ementa.nome+'"'+','+'"'+ementa.establecimento+'"'+','+'"'+ementa.preço+'"'+")'></li>")});
      })
    });
    $("#pesqementa").click(function(){
      var query = $('#txtbox').val();
      $.get("/user/listementas/"+query, function (data) {
        $('#listdiv').html("");
        data.forEach(ementa=>{ $('#listdiv').append("<li><b>Name</b>: " +ementa.nome + " - <b>Establecimento</b>: "+ementa.establecimento+" - <b>Descrição</b>: "
        +ementa.descrição+" - <b>Preço</b>: "+ementa.preço+"<input type='button' value='Adicionar' onclick='add("+'"'+ementa.nome+'"'+','+'"'+ementa.establecimento+'"'+','+'"'+ementa.preço+'"'+")'></li>")});
      })
    });
    $("#verPedidos").click(function(){
      $.get("/user/getpedidos/", function (data) {
        $('#listdiv').html("");
        data.forEach(pedido=>{ $('#listdiv').append("<li><b>Establecimento</b>: " +pedido.estabnome + " - <b>Estado</b>: "+pedido.estado+" - <b>Ementa</b>: "+pedido.ementa+"</li>")});
      })
    });
    $("#fazerPedido").click(function(){

      var estab = arrayPedido[0][1];
      console.log(arrayPedido[0][1]);
      var ementaPed="";
      var preco = 0;
      for (var i = 0; i < arrayPedido.length; i++) {
        ementaPed+=arrayPedido[i][0]+"," ;
        preco+=parseFloat(arrayPedido[i][2]);
      }
      console.log(ementaPed);
      var post={estabnome: estab, ementa: ementaPed};
      console.log(ementaPed);

      var flag = true;
      alert("Confirma pagamento"+preco)

      $.post("/user/newpedido",{estabnome: estab, ementa: ementaPed}, function (){
        alert("Sucesso")
        location.replace('http://localhost:3000/')
      })
    });
  });

function pesq(query){
  $.get("/user/ementasdoestablecimento/"+query, function (data) {
    $('#listdiv').html("");
    data.forEach(ementa=>{ $('#listdiv').append("<li><b>Name</b>: " +ementa.nome + " - <b>Establecimento</b>: "+ementa.establecimento+" - <b>Descrição</b>: "
    +ementa.descrição+" - <b>Preço</b>: "+ementa.preço+"<input type='button' value='"+ementa.nome+"' onclick='add("+'"'+ementa.nome+','+ementa.establecimento+'"'+")'></li>")});
  })
}
function add(query,query2,query3){
  arr=[];
  arr.push(query);
  arr.push(query2);
  arr.push(query3);
  arrayPedido.push(arr);
  console.log(arrayPedido);
}
