var mongoose    =   require("mongoose").set('debug', true);
mongoose.connect('mongodb://localhost:8080/Food1');

// create schema
var estabSchema  = {
    "nome" : {
              type: String,
              unique: true
            },
    "address" : String,
    "zone" : String,
    "contact" : Number,
    "NIF" : Number
};

 Establecimento = mongoose.model('establecimentos',estabSchema);

 module.exports = Establecimento;
