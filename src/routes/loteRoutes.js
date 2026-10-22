
const express = require('express');
const router = express.Router();

const loteController = require('../controllers/loteController');

const {
    exigirAutenticacao
} = require('../middlewares/autenticacao');

// Exige login somente nas rotas de lotes.
router.use('/lotes', exigirAutenticacao);

// Exibe a lista de lotes.
router.get('/lotes', loteController.listar);

// Abre um novo lote de recebimento.
router.post('/lotes', loteController.abrir);

module.exports = router;
