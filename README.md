
# CrioBlood

Sistema de gerenciamento desenvolvido como projeto acadêmico.

## Objetivo

Organizar informações e operações relacionadas ao gerenciamento de um hemocentro, com controle de acesso por usuários e permissões administrativas.

## Tecnologias

- Node.js
- Express
- JavaScript
- HTML e CSS
- EJS
- Sequelize
- PostgreSQL
- Git e GitHub

## Arquitetura

O projeto será organizado seguindo o padrão MVC (Model, View e Controller).

## Segurança

- Cadastro de usuários realizado exclusivamente pelo administrador.
- Permissões personalizáveis pelo administrador.
- Autenticação e controle de acesso.
- Proteção de credenciais e configurações sensíveis.
- Em produção atrás de um proxy HTTPS, configure `NODE_ENV=production`; o Express confia no proxy para emitir corretamente o cookie de sessão seguro.

No desenvolvimento local, acesse o servidor por `http://localhost:<PORT>` (não `https://`). Em produção, acesse a URL HTTPS fornecida pela plataforma; o proxy termina o HTTPS e encaminha as requisições ao servidor Express.

## Status

Em desenvolvimento.
