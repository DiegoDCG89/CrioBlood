const express = require('express');
const router = express.Router();
const hemocomponenteController = require('../controllers/hemocomponenteController');
const { verificarAutenticacao } = require('../middlewares/autenticacao'); // Ajuste o nome conforme exportado no seu arquivo

// Todas as rotas de hemocomponentes exigem usuário logado
router.use(verificarAutenticacao);

// Listagem
router.get('/', hemocomponenteController.index);

// Criação
router.get('/novo', hemocomponenteController.renderizarCadastro);
router.post('/novo', hemocomponenteController.salvarNovo);

// Edição
router.get('/editar/:id', hemocomponenteController.renderizarEdicao);
router.post('/editar/:id', hemocomponenteController.atualizar);

// Descarte (Usando POST para formulários ou link seguro)
router.post('/descartar/:id', hemocomponenteController.descartar);

module.exports = router;
