    var express = require('express');
    var router = express.Router();
    var Ementa = require("../models/Ementa");
    var User = require("../models/User");
    var Estab = require("../models/Establecimento");
    var Pedido = require("../models/Pedido");

    router.post('/login',function(req, res){
      User.findOne({mail: req.body.mail},
        function(err, user) {
          if(err){
            console.log(err);
            return res.status(500).send();
          }
          if(!user) {
            return res.status(404).send("false");
          }
          user.comparePassword(req.body.password, function(err, isMatch) {
            if (isMatch && isMatch == true) {
              req.session.user = user;
              req.session.mail = req.body.mail;
              return res.status(200).send("true");
            } else return res.status(401).send("false");
        });
        })
      });

      router.get('/logout',function(req, res){
        req.session.destroy();
        return res.status(200).redirect('/');
      });

      router.get('/menu',function(req, res){
        return res.status(200).render('menu');
      });

      router.post('/newuser',function(req,res){
        console.log(JSON.stringify(req.body));
        var newuser = new User();
        newuser.mail = req.body.mail;
        newuser.password = req.body.password;
        newuser.address = req.body.address;
        newuser.contact = req.body.contact;
        newuser.save(function(err, savedUser){
          if(err){
            console.log(err);
            return res.status(500).send();
          }
          return res.status(200).send();
        })
      });
      router.post('/newpedido',function(req,res){
        console.log(JSON.stringify(req.body));
        var newpedido = new Pedido();
        newpedido.usermail = req.session.mail;
        newpedido.estabnome = req.body.estabnome;
        newpedido.ementa = req.body.ementa;
        newpedido.estado = 'Pendente';
        newpedido.save(function(err, savedUser){
          if(err){
            console.log(err);
            return res.status(500).send();
          }
          return res.status(200).send();
        })
      });

      router.get('/listementas',function(req, res){
        Ementa.find({}, function (err, ementas) {
          if(err){
            console.log(err);
            return res.status(500).send();
          }
        return res.status(200).send(ementas);
        });
      });
      router.get('/getpedidos',function(req, res){
        Pedido.find({"usermail":req.session.mail, $or: [{"estado": "A Caminho"},{"estado": "Pendente"}]}, function (err, pedidos) {
        return res.status(200).send(pedidos);
        if(err){
          console.log(err);
          return res.status(500).send();
        }
        });
      });
      router.get('/listementas/:query',function(req, res){

        Ementa.find({"nome":{$regex : ".*"+req.params.query+".*"}}, function (err, ementas) {
        return res.status(200).send(ementas);
        });
      });
      router.get('/listestablecimentos',function(req, res){
          Estab.find({}, function (err, estabs) {
          return res.status(200).send(estabs);
          });
      });
      router.get('/listestablecimentos/:query',function(req, res){
          Estab.find({"nome":{$regex : ".*"+req.params.query+".*"}}, function (err, estabs) {
          return res.status(200).send(estabs);
          });
      });
      router.get('/ementasdoestablecimento/:query',function(req, res){
          Ementa.find({"establecimento":{$regex : ".*"+req.params.query+".*"}}, function (err, ementas) {
          return res.status(200).send(ementas);
          });
      });



      module.exports = router;
