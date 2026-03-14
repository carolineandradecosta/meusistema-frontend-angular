import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent implements OnInit {
  editar: boolean = false;
  formGroup: FormGroup;
  idSelecionado: number | null = null;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    // Inicialização do formulário com a estrutura de endereço aninhada
    this.formGroup = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', Validators.required),
      endereco: new FormGroup({
        cep: new FormControl('', Validators.required),
        logradouro: new FormControl('', Validators.required),
        numero: new FormControl('', Validators.required),
        complemento: new FormControl(''),
        bairro: new FormControl('', Validators.required),
        cidade: new FormControl('', Validators.required),
        estado: new FormControl('', Validators.required),
        pais: new FormControl('Brasil')
      })
    });
  }

  ngOnInit(): void {
    // 1. Captura o ID da URL (ex: /clientes/editar/5)
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.idSelecionado = id;
      this.editar = true;
      // 2. Se existe ID, busca no banco de dados
      this.clienteService.buscarPorId(id).subscribe({
        next: (cliente) => {
          // 3. Preenche o formulário com os dados retornados
          this.formGroup.patchValue(cliente);
        },
        error: (err) => {
          Swal.fire('Erro', 'Cliente não encontrado', 'error');
          this.router.navigate(['/cliente/novo']);
        }
      });
    }

    // Escuta mudanças no CEP para preenchimento automático (ViaCEP)
    this.formGroup.get('endereco.cep')?.valueChanges.subscribe(valor => {
      const cep = valor?.replace(/\D/g, '');
      if (cep?.length === 8) {
        this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((dados: any) => {
          if (!dados.erro) {
            this.formGroup.get('endereco')?.patchValue({

              logradouro: dados.logradouro,
              bairro: dados.bairro,
              cidade: dados.localidade,
              estado: dados.uf

            });
          }
        });
      }
    }
    );
  }

  cadastrar() {
    if (this.formGroup.invalid) {
      Swal.fire('Atenção', 'Preencha todos os campos obrigatórios', 'warning');
      return;
    }

    const cliente: Cliente = this.formGroup.value;

    if (this.editar && this.idSelecionado) {
      cliente.id = this.idSelecionado; // Injetamos o ID manualmente aqui
    }

    const operacao = this.editar
      ? this.clienteService.atualizar(cliente)
      : this.clienteService.inserir(cliente);

    operacao.subscribe({
      next: () => {
        this.exibirMensagemSucesso();
      },
      error: (error) => {
        console.error(error);
        Swal.fire('Erro', 'Erro ao atualizar cliente!', 'error');
      }
    });

  }

  cancelar() {
    this.router.navigate(['/cliente']);
  }

  private exibirMensagemSucesso() {
    Swal.fire({
      icon: 'success',
      title: 'Sucesso',
      text: `Cliente ${this.editar ? 'atualizado' : 'cadastrado'} com sucesso!`,
      showConfirmButton: false,
      timer: 1500
    });
    this.router.navigate(['/cliente']);
  }

  private exibirMensagemErro(error: any) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Falha na comunicação com o servidor',
    });
  }
}
