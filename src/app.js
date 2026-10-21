
require('dotenv').config();

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const pool = require('./database');

const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

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

// Verifica se a chave de sessão está configurada
if (!process.env.SESSION_SECRET) {
    throw new Error('Configure SESSION_SECRET no arquivo .env');
}

// Configuração das sessões
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

// Login
app.get('/login', (req, res) => {
    res.render('auth/login');
});

// Rotas do painel protegido
app.use(dashboardRoutes);

// Rotas de autenticação
app.use(authRoutes);

// Rotas de usuários
app.use(usuarioRoutes);

// Redireciona a página inicial para o login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Exibe a tela de login sem renderizar o arquivo EJS
app.get('/login', (req, res) => {
    res.send('Rota de login funcionando. Teste de diagnóstico.');
});

// Verifica a conexão com o banco de dados
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

// Tratamento de rotas inexistentes
app.use((req, res) => {
    res.status(404).send('Página não encontrada.');
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`CrioBlood disponível em http://localhost:${PORT}`);
});
