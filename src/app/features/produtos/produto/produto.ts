import { Component, Input, Output, EventEmitter } from '@angular/core';
import{ UpperCasePipe, CurrencyPipe}from '@angular/common';
import{PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import {MatButtonModule } from '@angular/material/button';
import {MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe, MatButtonModule, MatCardModule],
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
@Output() produtoAdicionado = new EventEmitter<{
  nome: string;
  preco: number;
}>();

adicionarAoCarrinho() {
  this.produtoAdicionado.emit({
    nome:this.nome,
     preco: this.preco,
  });
}
}
