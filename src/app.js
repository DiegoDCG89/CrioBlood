
require('dotenv').config();

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const pool = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações gerais
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Proteções e leitura das requisições
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Limite básico de requisições
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: 'draft-7',
  legacyHeaders: false
}));

// Sessões de usuário
if (!process.env.SESSION_SECRET) {
  throw new Error('Configure SESSION_SECRET no arquivo .env');
}

app.use(session({
  name: 'crioblood.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 30
  }
}));

// Rota inicial temporária
app.get('/', (req, res) => {
  res.send(`
    <h1>CrioBlood</h1>
    <p>Servidor iniciado com sucesso!</p>
    <p>Ambiente de desenvolvimento.</p>
  `);
});

 // Verificar a conexão com o banco de dados
app.get('/teste-banco', async (req, res) => {
    try {
        const resultado = await pool.query(
            'SELECT current_database() AS banco'
        );

        res.json({
            sucesso: true,
            mensagem: 'CrioBlood conectado ao PostgreSQL!',
            banco: resultado.rows[0].banco
        });
    } catch (erro) {
        console.error('Erro na conexão:', erro.message);

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao conectar ao banco de dados.'
        });
    }
});

// Tratamento básico de rotas inexistentes
app.use((req, res) => {
  res.status(404).send('Página não encontrada.');
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`CrioBlood disponível em http://localhost:${PORT}`);
});
