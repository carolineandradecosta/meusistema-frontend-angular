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
