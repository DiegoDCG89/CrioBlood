
const bcrypt = require('bcrypt');

async function gerarHashSenha(senha) {
    return await bcrypt.hash(senha, 12);
}

async function verificarSenha(senha, hash) {
    return await bcrypt.compare(senha, hash);
}

module.exports = {
    gerarHashSenha,
    verificarSenha
};
