
const usuarioService = require('../services/usuarioService');

// Exibir lista de usuários
async function listar(req, res) {
    try {
        const usuarios = await usuarioService.listarUsuarios();

        res.render('usuarios/index', {
            usuario: req.session.usuario,
            usuarios,
            erro: null,
            sucesso: null
        });
    } catch (erro) {
        console.error('Erro ao listar usuários:', erro.message);
        return res.status(500).send('Erro ao carregar usuários.');
    }
}

// Exibir formulário de cadastro
async function mostrarCadastro(req, res) {
    try {
        res.render('usuarios/cadastro', {
            usuario: req.session.usuario,
            erro: null
        });
    } catch (erro) {
        console.error('Erro ao abrir cadastro:', erro.message);
        return res.status(500).send('Erro ao abrir formulário.');
    }
}

// Cadastrar usuário
async function cadastrar(req, res) {
    try {
        const nome = req.body.nome?.trim();
        const login = req.body.login?.trim();
        const senha = req.body.senha;

        if (!nome || !login || !senha) {
            return res.status(400).send(
                'Preencha todos os campos obrigatórios.'
            );
        }

        if (nome.length > 150 || login.length > 80) {
            return res.status(400).send(
                'Nome ou login ultrapassa o limite permitido.'
            );
        }

        if (senha.length < 8) {
            return res.status(400).send(
                'A senha deve ter pelo menos 8 caracteres.'
            );
        }

        await usuarioService.criarUsuario({
            nome,
            login,
            senha,
            administrador: false
        });

        return res.redirect('/usuarios');
    } catch (erro) {
        if (erro.code === '23505') {
            return res.status(409).send(
                'Este login já está cadastrado.'
            );
        }

        console.error('Erro ao cadastrar usuário:', erro.message);
        return res.status(500).send('Erro ao cadastrar usuário.');
    }
}

async function mostrarPermissoes(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).send('ID de usuário inválido.');
        }

        const usuario = await usuarioService.buscarPorId(id);

        if (!usuario) {
            return res.status(404).send('Usuário não encontrado.');
        }

        const permissoes = await usuarioService.listarPermissoes();
        const permissoesUsuario =
            await usuarioService.listarPermissoesUsuario(id);

        const idsSelecionados = permissoesUsuario.map(
            permissao => permissao.id
        );

        return res.render('usuarios/permissoes', {
            usuario: req.session.usuario,
            usuarioAlvo: usuario,
            permissoes,
            idsSelecionados,
            erro: null,
            sucesso: null
        });
    } catch (erro) {
        console.error('Erro ao carregar permissões:', erro.message);
        return res.status(500).send('Erro ao carregar permissões.');
    }
}

async function salvarPermissoes(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).send('ID de usuário inválido.');
        }

        const permissoesIds = req.body.permissoes || [];
        const lista = Array.isArray(permissoesIds)
            ? permissoesIds
            : [permissoesIds];

        await usuarioService.salvarPermissoes(id, lista);

        return res.redirect(`/usuarios/${id}/permissoes`);
    } catch (erro) {
        console.error('Erro ao salvar permissões:', erro.message);

        if (erro.message === 'Usuário não encontrado.') {
            return res.status(404).send(erro.message);
        }

        return res.status(400).send(
            'Não foi possível salvar as permissões. Verifique os dados e tente novamente.'
        );
    }
}

module.exports = {
    listar,
    mostrarCadastro,
    cadastrar,
    mostrarPermissoes,
    salvarPermissoes
};