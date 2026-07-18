import { Component, Input, Output, EventEmitter } from '@angular/core';
import{ UpperCasePipe, CurrencyPipe}from '@angular/common';
import{PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
//cria a classe Produto com variáveis (preco, produto) e condicionais (mostrarProduto, mostrarPreco)
export class Produto {
  //entrada de dados da lista produtos em lista-produtos
@Input() nome: string = '';
@Input() preco: number = 0;
//saída de dados de produtos selecionados para lista-produtos
@Output() produtoSelecionado = new EventEmitter<string>();
selecionarProduto(){
  this.produtoSelecionado.emit(this.nome);
}
}
