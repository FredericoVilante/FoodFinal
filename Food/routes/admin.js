var express = require('express');
var router = express.Router();
var Estab = require("../models/Establecimento");

router.post('/newestablecimento',function(req,res){
  console.log(JSON.stringify(req.body));
  var newestablecimento = new Estab();
  newestablecimento.nome = req.body.nome;
  newestablecimento.zone = req.body.zone;
  newestablecimento.address = req.body.address;
  newestablecimento.contact = req.body.contact;
  newestablecimento.NIF = req.body.NIF;
  newestablecimento.save(function(err, savedUser){
    if(err){
      console.log(err);
      return res.status(500).send();
    }

    return res.status(200).send();
  })
});


module.exports = router;
