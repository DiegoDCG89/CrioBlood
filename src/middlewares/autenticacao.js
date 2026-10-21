
const usuarioService = require('../services/usuarioService');

// Verificar se o usuário está autenticado
function exigirAutenticacao(req, res, next) {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }

    next();
}

// Verificar se o usuário é administrador
function exigirAdministrador(req, res, next) {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }

    if (!req.session.usuario.administrador) {
        return res.status(403).send(
            'Acesso negado. Somente administradores podem realizar esta ação.'
        );
    }

    next();
}

// Verificar se o usuário possui uma permissão específica
function exigirPermissao(codigoPermissao) {
    return async function (req, res, next) {
        if (!req.session.usuario) {
            return res.redirect('/login');
        }

        // Administradores têm acesso total
        if (req.session.usuario.administrador) {
            return next();
        }

        try {
            const permissoes =
                await usuarioService.listarPermissoesUsuario(
                    req.session.usuario.id
                );

            const possuiPermissao = permissoes.some(
                permissao => permissao.codigo === codigoPermissao
            );

            if (!possuiPermissao) {
                return res.status(403).send(
                    'Acesso negado. Você não possui permissão para esta ação.'
                );
            }

            next();
        } catch (erro) {
            console.error(
                'Erro ao verificar permissão:',
                erro.message
            );

            return res.status(500).send(
                'Erro ao verificar as permissões do usuário.'
            );
        }
    };
}

module.exports = {
    exigirAutenticacao,
    exigirAdministrador,
    exigirPermissao
};
