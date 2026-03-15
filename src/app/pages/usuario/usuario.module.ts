import { CommonModule } from '@angular/common';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login/login/login.component';


@NgModule({
  declarations: [
    LoginComponent,
    CadastrarUsuarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,

  ],


  schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [],
    exports: [
      CadastrarUsuarioComponent
    ]

})
export class UsuarioModule { }
