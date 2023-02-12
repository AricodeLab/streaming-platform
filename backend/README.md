## DATABASE

#### Current Entities

`User`
```ts
class User {
  id: number;
  email: string;
  password: string; // hash of password
}
```

## API GUIDE

A principal url é em `http://localhost:3000/`
e as rotas são:
* `/auth/register`
Onde se fará o registro do usuario, se devera especificar o email e password
> Json Esperado em metodo POST
```json
{
  "password": "senha123",
  "email" : "pcaladomoura@gmail.com"
}
```
> Json de retorno
```json
{
  "msg" : "User created"
}
```
* `/auth/login`
Onde se fará o login do usuario, se devera especificar o email e password

> Json Esperado em metodo POST
```json
{
  "email": "Pedro",
  "password": "senha123",
}
```
> Json de retorno
```json
{
  "msg": "you are login"
}
```
"NAO é necesario colocar token nos headers por ja coloco automaticamente no cookies no formato Authorization=token"

* `/auth/me`
Para pegar as informações de usuario
> Json de retorno em metodo GET
```json
{
  "password": "senha123",
  "email" : "pcaladomoura@gmail.com"
}
```