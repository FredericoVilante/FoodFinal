var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/payment', function(req, res, next) {
  res.render('pay');
});
router.get('/account', function(req, res, next) {
    if(!req.session.user)
        return res.status(401).send();

  return res.status(200).send('Welcome');
});
router.get('/establecimento', function(req, res, next) {
  res.render('Establecimento/estab');
});
router.get('/admin', function(req, res, next) {
  res.render('Admin/admin');
});
router.get('/estafeta', function(req, res, next) {
  res.render('Estafeta/estafeta');
});

module.exports = router;
