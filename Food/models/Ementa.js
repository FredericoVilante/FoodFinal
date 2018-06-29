var mongoose    =   require("mongoose").set('debug', true);
mongoose.connect('mongodb://localhost:8080/Food1');

// create schema
var ementaSchema  = {
    "nome" : String,
    "alergenios" : Boolean,
    "establecimento" : String,
    "descrição" : String,
    "preço" : Number,
		"tipo" : {
      type: String,
      enum: ['Vegetariano','Italiano', 'Japones','indiano','Churrasco']
}
};

 Ementa = mongoose.model('ementas',ementaSchema);

 module.exports = Ementa;
