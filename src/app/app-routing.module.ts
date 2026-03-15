import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroClienteComponent } from './pages/cliente/cadastro-cliente/cadastro-cliente.component';
import { ListagemClienteComponent } from './pages/cliente/listagem-cliente/listagem-cliente.component';
import { CadastrarUsuarioComponent } from './pages/usuario/cadastrar-usuario/cadastrar-usuario.component';
import { LoginComponent } from './pages/usuario/login/login/login.component';

const routes: Routes = [

  { path: '', component: CadastrarUsuarioComponent },

  { path: 'login', component: LoginComponent },

  {
    path: 'cliente',
    children: [
      { path: 'novo', component: CadastroClienteComponent },
      { path: 'editar/:id', component: CadastroClienteComponent },
      { path: 'listar', component: ListagemClienteComponent },
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always' // Isso força os filhos a herdarem os IDs da URL
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
