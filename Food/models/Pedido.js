var mongoose    =   require("mongoose").set('debug', true);
mongoose.connect('mongodb://localhost:8080/Food1');

// create schema
var pedidoSchema  = {
    "usermail" : String,
    "estabnome" : String,
    "ementa" : String,
    "estado" : {
      type: String,
      enum: ['Pendente','A Caminho', 'Entregue']
      }
};

 Pedido = mongoose.model('pedidos',pedidoSchema);

 module.exports = Pedido;
