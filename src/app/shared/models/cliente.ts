export interface Cliente {
  id : number,
  nome : string,
  cpf : string,
  email : string,
  telefone: string,
  endereco: {
    cep: string,
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
  }
}
