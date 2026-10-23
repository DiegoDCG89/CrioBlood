const express = require('express');
const router = express.Router();
const hemocomponenteController = require('../controllers/hemocomponenteController');
const { verificarAutenticacao } = require('../middlewares/autenticacao');

// 1. IMPORTAR OS VALIDADORES
const { validarHemocomponente } = require('../middlewares/validacao'); 

router.use(verificarAutenticacao);

// Listagem
router.get('/', hemocomponenteController.index);

// Criação
router.get('/novo', hemocomponenteController.renderizarCadastro);
// 2. INJETAR O MIDDLEWARE DE VALIDAÇÃO AQUI (antes do controller)
router.post('/novo', validarHemocomponente, hemocomponenteController.salvarNovo);

// Edição
router.get('/editar/:id', hemocomponenteController.renderizarEdicao);
// 3. INJETAR AQUI TAMBÉM (para garantir que edições obedeçam as mesmas regras)
router.post('/editar/:id', validarHemocomponente, hemocomponenteController.atualizar);

// Descarte
router.post('/descartar/:id', hemocomponenteController.descartar);

module.exports = router;
