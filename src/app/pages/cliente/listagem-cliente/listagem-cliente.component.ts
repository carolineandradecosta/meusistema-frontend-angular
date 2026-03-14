import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/shared/models/cliente';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-cliente',
  templateUrl: './listagem-cliente.component.html',
  styleUrls: ['./listagem-cliente.component.scss']
})
export class ListagemClienteComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes() {
    this.clienteService.listar().subscribe({
      next: (dados) => {
        this.clientes = dados;
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Erro', 'Não foi possível carregar a lista de clientes', 'error');
      }
    });
  }

  novoCliente(): void {
    this.router.navigate(['/cliente/novo']);
  }

  editarCliente(id: number): void {
    this.router.navigate(['/cliente/editar', id]);
  }

  deletar(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Esta ação não poderá ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(id).subscribe({
          next: () => {
            Swal.fire('Deletado!', 'Cliente removido com sucesso.', 'success');
            this.listarClientes(); // Atualiza a lista
          },
          error: () => Swal.fire('Erro', 'Erro ao tentar deletar cliente', 'error')
        });
      }
    });
  }

}
