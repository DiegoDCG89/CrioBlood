
const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

const {
    exigirAutenticacao,
    exigirAdministrador
} = require('../middlewares/autenticacao');

router.use(exigirAutenticacao);
router.use(exigirAdministrador);

// Listar usuários
router.get('/usuarios', usuarioController.listar);

// Abrir cadastro
router.get('/usuarios/novo', usuarioController.mostrarCadastro);

// Cadastrar usuário
router.post('/usuarios', usuarioController.cadastrar);

// Abrir permissões de um usuário
router.get(
    '/usuarios/:id/permissoes',
    usuarioController.mostrarPermissoes
);

// Salvar permissões
router.post(
    '/usuarios/:id/permissoes',
    usuarioController.salvarPermissoes
);

module.exports = router;
