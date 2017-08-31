## Prequisities

The projects needs that you have the following things installed:

- NodeJS
- MongoDB
- Redis

### Install node modules and type definitions

```
npm install
```

## Local development

### Build

```
npm run build
```

### Start web server

```
npm start / npm run dev

http://localhost:5000/user/domainId/1/accountId/1/clientId/10

```
### Header passando o token e a lista com os Ids dos usuarios privados
Authorization Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI..
private-users [1,5,4,6,9]

## Para injetar os parametros no header usar a extencao no chrome Modify headers

############### End Points Nodejs #########

### Criar salas
localhost:5000/api/room/ -> PUT

{
        "domainId": 1,
        "accountId": 1,
        "name": "sala 4",
        "isEnabled": true
    }

### Criar usuarios
localhost:5000/api/user -> PUT

{
    "domainId": 1,
    "accountId": 1, // account do cliente no vc
    "clientId": 9, // Id do cliente no vc
    "name": "mateus"
  }

### Add Usuario na sala 
localhost:5000/api/user/add/room/idSala -> PUT ex: localhost:5000/api/user/add/room/59a4e51c387a0a5f76a1a8c2

{        "domainId": 1, // id do domino
        "accountId": 1, // account do cliente no vc
        "clientId": 9 // Id do cliente no vc
  }
  
## Variaveis de ambiente : Inserir no /etc/enviroment

PATH_PUBLIC_KEY="/home/mateus/Documents/public.txt" -> chave publica do pair do jwt

MONGODB_URI="mongodb://localhost/chat";

REDIS_URL="redis://localhost:6379"

VC_APP_CHAT_PORT=5000






