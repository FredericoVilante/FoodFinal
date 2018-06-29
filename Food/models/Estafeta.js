var mongoose    =   require("mongoose").set('debug', true);
mongoose.connect('mongodb://localhost:8080/Food1');

// create schema
var estafetaSchema  = {
    "nome" : {
              type: String,
              unique: true
            },
    "pedido" : String,
    "zone" : String,
    "contact" : Number
};

 Estafeta = mongoose.model('estafetas',estafetaSchema,'estafetas');

 module.exports = Estafeta;
