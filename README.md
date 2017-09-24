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
http://localhost:5000/api/room/domainId/1/accountId/1/name/postman111

### Criar usuarios
localhost:5000/api/user/domainId/1/accountId/1/clientId/1/name/meunome

### Add Usuario na sala 
localhost:5000/api/user/domainId/1/accountId/1/clientId/10/add/room/59c6ec42a035336cd22f95de
  
## Variaveis de ambiente : Inserir no /etc/enviroment

PATH_PUBLIC_KEY="/home/mateus/Documents/public.txt" -> chave publica do pair do jwt

MONGODB_URI="mongodb://localhost/chat"

REDIS_URL="redis://localhost:6379"

VC_APP_CHAT_PORT=5000






