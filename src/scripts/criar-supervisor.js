
require('dotenv').config();

const pool = require('../database.js');
const { gerarHashSenha } = require('../services/authService.js');

async function criarSupervisor() {
    try {
        const login = 'Supervisor';
        const senha = process.env.SUPERVISOR_PASSWORD;

        if (!senha) {
            throw new Error(
                'Configure SUPERVISOR_PASSWORD no arquivo .env.'
            );
        }

        const usuarioExistente = await pool.query(
            'SELECT id FROM usuarios WHERE login = $1',
            [login]
        );

        if (usuarioExistente.rows.length > 0) {
            console.log('O usuário Supervisor já existe.');
            return;
        }

        const senhaHash = await gerarHashSenha(senha);

        const resultado = await pool.query(
            `INSERT INTO usuarios
                (nome, login, senha_hash, ativo, administrador)
             VALUES ($1, $2, $3, TRUE, TRUE)
             RETURNING id, nome, login, administrador`,
            ['Supervisor', login, senhaHash]
        );

        const supervisor = resultado.rows[0];

        const permissoes = await pool.query(
            'SELECT id FROM permissoes'
        );

        for (const permissao of permissoes.rows) {
            await pool.query(
                `INSERT INTO usuario_permissoes
                    (usuario_id, permissao_id)
                 VALUES ($1, $2)
                 ON CONFLICT DO NOTHING`,
                [supervisor.id, permissao.id]
            );
        }

        console.log('Supervisor criado com sucesso!');
        console.log('Login:', supervisor.login);
        console.log('Administrador:', supervisor.administrador);
        console.log('Permissões atribuídas:', permissoes.rowCount);
    } catch (erro) {
        console.error('Erro ao criar Supervisor:', erro.message);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

criarSupervisor();
