
const pool = require('../database');
const { gerarHashSenha, verificarSenha } = require('./authService');


async function buscarPorLogin(login) {
    const resultado = await pool.query(
        `SELECT id, nome, login, senha_hash, ativo, administrador
         FROM usuarios
         WHERE login = $1`,
        [login]
    );

    return resultado.rows[0] || null;
}

async function criarUsuario({ nome, login, senha, administrador = false }) {
    const senhaHash = await gerarHashSenha(senha);

    const resultado = await pool.query(
        `INSERT INTO usuarios (nome, login, senha_hash, administrador)
         VALUES ($1, $2, $3, $4)
         RETURNING id, nome, login, ativo, administrador`,
        [nome, login, senhaHash, administrador]
    );

    return resultado.rows[0];
}

module.exports = {
    buscarPorLogin,
    criarUsuario,
    verificarSenha
};
