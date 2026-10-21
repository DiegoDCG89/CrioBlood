
const express = require('express');
const router = express.Router();

const {
    exigirAutenticacao
} = require('../middlewares/autenticacao');

router.get('/dashboard', exigirAutenticacao, (req, res) => {
    res.render('dashboard/index', {
        usuario: req.session.usuario
    });
});

module.exports = router;
