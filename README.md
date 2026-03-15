# Meusistema-frontend-angular

Este projeto Frontend implementa o CRUD (Criação, Leitura, Atualização e Exclusão) completo, permitindo a gestão das entidades que são gerenciadas pelo Back-end.

---

## 🚀 Guia de Início Rápido

### Pré-requisitos
Certifique-se de ter o **Node.js** instalado. Para verificar a versão, utilize:

```
node -v 
```

Instalação do Angular CLI
Caso não tenha o CLI instalado globalmente, execute:

```
npm install -g @angular/cli
```


##Criar e Rodar o Projeto:

Criar o projeto:
```
ng new nome-projeto
```
Acessar a pasta:
```
cd nome-projeto
```
Executar a aplicação:
```
ng serve
```
Acessar no navegador: 

(http://localhost:4200)

## 🏗️ Estrutura de Componentes
Para criar um novo componente, utilize o comando:
```
ng generate component nome-do-componente
```

### Arquitetura do ComponenteCada componente é gerado com a seguinte estrutura de arquivos:

* .ts: Lógica e metadados.
* .html: Estrutura de visualização.
* .css: Estilização local.

### Exemplo de implementação:TypeScriptimport { Component } from '@angular/core';

```
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  // Lógica do componente aqui
}
```

## 🔌 Integração com API (Services)Os serviços são utilizados para centralizar a comunicação com o Back-end.
Criar um Serviço

```
ng generate service services/usuario
```

### Exemplo de Consumo (HttpClient):
No arquivo do serviço, injete o HttpClient para realizar as requisições:TypeScriptimport { HttpClient } from '@angular/common/http';

```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get('/api/usuarios');
  }
}
```

## 🛠️ Comandos Úteis:

Rodar Servidor
```
ng serve
```
Criar Componente
```
ng generate component X
```

Criar Serviço
```
ng generate service X
```

Gerar Build
```
ng build
```


---

## Funcionalidades Implementadas

### 1. Registro de Usuário (`CadastrarUsuarioComponent`)

- Formulário com campos:
  - **username**
  - **email**
  - **password**
  - **role** (User ou Admin)
- Validações:
  - Campos obrigatórios
  - Email no formato correto
- Envia requisição para backend via `AuthService.register()`.
- Mostra mensagens de **sucesso** ou **erro**.
- Após registro, redireciona para `/login`.

---

### 2. Login (`LoginComponent`)

- Formulário com campos:
  - **email**
  - **password**
- Ao enviar, chama `AuthService.login()`:
  - Recebe token JWT e informações do usuário do backend.
  - Armazena localmente (localStorage) e no estado global (`BehaviorSubject`).
- Redireciona para a rota protegida principal (`/cliente/listar`).

---

### 3. Estado Global de Autenticação (`AuthService`)

- Substitui o **Context do React**.
- Mantém **usuário logado e token** globalmente:
  - `currentUser$` → Observable para componentes reagirem a mudanças.
  - `currentUserValue` → valor atual do usuário.
- Métodos:
  - `login(credentials)` → faz login, atualiza estado global.
  - `register(user)` → registra usuário.
  - `logout()` → limpa estado e redireciona para login.
  - `isLoggedIn()` → verifica se existe usuário logado.
- Salva token e usuário no **localStorage** para persistência entre reloads.

---

### 4. Proteção de Rotas (`AuthGuard`)

- Implementa `CanActivate` do Angular.
- Antes de carregar uma rota protegida:
  - Verifica se `AuthService.isLoggedIn()` é verdadeiro.
  - Se não estiver logado, redireciona para `/login`.
- Usado em rotas de clientes ou páginas privadas.

---

### 5. Interceptor JWT (`JwtInterceptor`)

- Intercepta todas as requisições HTTP do Angular.
- Se o usuário estiver logado, adiciona cabeçalho:

```http
Authorization: Bearer <token>
