var express = require('express');
var router = express.Router();
var Estafeta = require("../models/Estafeta");
var Ementa = require("../models/Ementa");
var Pedido = require("../models/Pedido");


router.get('/', function(req, res, next) {
  res.render('Establecimento/Estab');
});

router.post('/newestafeta',function(req,res){
  console.log(JSON.stringify(req.body));
  var newestafeta = new Estafeta();
  newestafeta.nome = req.body.nome;
  newestafeta.zone = req.body.zone;
  newestafeta.contact = req.body.contact;
  newestafeta.pedido = null;
  newestafeta.save(function(err, savedEstafeta){
    if(err){
      console.log(err);
      return res.status(500).send();
    }

    return res.status(200).send();
  })
});
router.post('/newementa',function(req,res){
  console.log(JSON.stringify(req.body));
  var newementa = new Ementa();
  newementa.nome = req.body.nome;
  newementa.alergenios = req.body.alergenios;
  newementa.establecimento = req.body.establecimento;
  newementa.descrição = req.body.descrição;
  newementa.preço = req.body.preço;
  newementa.save(function(err, savedEmenta){
    if(err){
      console.log(err);
      return res.status(500).send();
    }

    return res.status(200).send();
  })
});

router.put('/pedidoestafeta/:estafeta/:pedido',function(req,res){
  Pedido.findById(req.params.pedido, function (err, pedido) {
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    pedido.estado='A Caminho';
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
    estafeta.pedido=req.params.pedido;
    estafeta.save(function(err, savedEstafeta){
      if(err){
        console.log(err);
        return res.status(500).send();
      }
      return res.status(200).send();
    })
  });
});
router.get('/getpedidos/:estab',function(req, res){
  Pedido.find({"estabnome":req.params.estab, "estado": "Pendente"}, function (err, pedidos) {
    if(err){
      console.log(err);
      return res.status(500).send();
    }
  return res.status(200).send(pedidos);
  });
});
router.get('/getestafetas',function(req, res){
  Estafeta.find({}, function (err, ementas) {
    if(err){
      console.log(err);
      return res.status(500).send();
    }
  return res.status(200).send(ementas);
  });
});
module.exports = router;
