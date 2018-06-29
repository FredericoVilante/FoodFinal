var express = require('express');
var router = express.Router();
var Pedido = require("../models/Pedido");
var Estafeta = require("../models/Estafeta");

router.get('/pedido/:estafeta',function(req, res){

  Estafeta.findOne({"nome":req.params.estafeta}, function (err, estafeta) {
    return res.status(200).send(estafeta.pedido);
});
});

router.get('/pedidodoestafeta/:pedido',function(req, res){
  Pedido.findById(req.params.pedido, function (err, pedido) {
    return res.status(200).send(pedido);
});
});

router.put('/fechar/:pedido/:estafeta',function(req,res){
  Pedido.findById(req.params.pedido, function (err, pedido) {
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    pedido.estado='Entregue';
    pedido.save(function(err, savedPedido){
      if(err){
        console.log(err);
        return res.status(500).send();
      }
      return res.status(200).send();
    })
  });
  Estafeta.findOne({"nome": req.params.estafeta}, function (err, estafeta) {
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    estafeta.pedido=null;
    estafeta.save(function(err, savedEstafeta){
      if(err){
        console.log(err);
        return res.status(500).send();
      }
      return res.status(200).send();
    })
  });
});
module.exports = router;
