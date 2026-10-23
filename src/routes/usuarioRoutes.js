
const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

const {
    exigirAutenticacao,
    exigirAdministrador
} = require('../middlewares/autenticacao');

// Todas as rotas abaixo exigem login e perfil de administrador.
router.use(exigirAutenticacao);
router.use(exigirAdministrador);

// Listar usuários
router.get('/usuarios', usuarioController.listar);

// Abrir formulário de cadastro
router.get('/usuarios/novo', usuarioController.mostrarCadastro);

// Cadastrar usuário
router.post('/usuarios', usuarioController.cadastrar);

// Abrir formulário de edição
router.get('/usuarios/:id/editar', usuarioController.mostrarEdicao);

// Salvar alterações do usuário
router.post('/usuarios/:id/editar', usuarioController.atualizar);

// Ativar ou desativar usuário
router.post('/usuarios/:id/status', usuarioController.alternarStatus);

// Abrir tela de permissões
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
