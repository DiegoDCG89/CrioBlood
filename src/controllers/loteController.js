
const pool = require('../database');
const crypto = require('crypto');

// Listar lotes cadastrados
async function listar(req, res) {
    try {
        const resultado = await pool.query(`
            SELECT
                l.id,
                l.codigo,
                l.data_recebimento,
                l.origem,
                l.status,
                l.criado_em,
                l.fechado_em,
                u.nome AS responsavel_abertura,
                COUNT(h.id)::INTEGER AS quantidade_bolsas
            FROM lotes_recebimento l
            INNER JOIN usuarios u
                ON u.id = l.aberto_por
            LEFT JOIN hemocomponentes h
                ON h.lote_id = l.id
            GROUP BY l.id, u.nome
            ORDER BY l.criado_em DESC
        `);

        res.render('lotes/index', {
            usuario: req.session.usuario,
            lotes: resultado.rows
        });
    } catch (erro) {
        console.error('Erro ao listar lotes:', erro.message);

        res.status(500).send(
            'Não foi possível carregar os lotes de recebimento.'
        );
    }
}

// Abrir um novo lote
async function abrir(req, res) {
    try {
        const usuarioId = req.session.usuario.id;

        // Gera um código próprio para o lote.
        // O código original das bolsas será preservado separadamente.
        const data = new Date();
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const dia = String(data.getDate()).padStart(2, '0');
        const identificador = crypto.randomBytes(3).toString('hex').toUpperCase();

        const codigo = `LOT-${ano}${mes}${dia}-${identificador}`;

        await pool.query(
            `INSERT INTO lotes_recebimento
                (codigo, origem, aberto_por)
             VALUES ($1, $2, $3)`,
            [codigo, 'Taubaté', usuarioId]
        );

        return res.redirect('/lotes');
    } catch (erro) {
        console.error('Erro ao abrir lote:', erro.message);

        return res.status(500).send(
            'Não foi possível abrir o lote de recebimento.'
        );
    }
}

module.exports = {
    listar,
    abrir
};

