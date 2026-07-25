import { Component } from '@angular/core';
import{Produto} from '../produto/produto';
import{signal} from '@angular/core';
import{computed} from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import{effect} from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { produtosService } from '../produtos.service';
import { inject } from '@angular/core'; 


@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
 //! SIGNALS 
produtos = signal<{nome: string; preco: number}[]>([]);
  carregando = signal(true);
  
  //! método para criar um estado de seleção com signal string | null
  produtoSelecionado = signal <string | null>(null);
  //! metodo para criar um estado para carrinho com signal
  carrinho = signal <{nome: string; preco: number}[]>([]);

  adicionarAoCarrinho(produto:{nome: string; preco: number}){
    this.carrinho.update(listaAtual => [...listaAtual, produto]
    );
  }
 //!função para exibir produtos selecionados
  exibirProduto(nome: string){
    console.log('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }

adicionarProduto(){
    this.produtos.update(listaAtual => [
      ...listaAtual,
      {nome:'Playstation 5', preco:3000},
    ]);
  }
//!função que adiciona produtos usando método update
  
  //!função que contabiliza a quantidade de itens na lista
  totalProdutos=computed(() => this.produtos().length);
  //função que calcula o valor total usando o método computed()
  valorTotal = computed(()=>
  {return this.produtos().reduce((total, item) =>
    total + item.preco,0
  )}
  );
substituirProdutos(){
    this.produtos.set([
      {nome:'Teclado', preco:50},
       {nome:'Mouse', preco:15},
        {nome:'Monitor', preco:500},
         {nome:'Desktop', preco:1500},
          {nome:'Headset', preco:30},
    ]);
  }
  
//!função para substitui a lista atual usando método set()
  
   //**inject */
private produtosService = inject(produtosService);


//===================metodo http clint (API)==================
carregarProdutos(){
this.carregando.set(true);
this.produtosService.buscarProdutos().subscribe({
  next: (dados) => {
    const produtos = this.produtosService.transformarProdutos(dados);
    this.produtos.set(produtos);
    this.carregando.set(false);
  },
  error: (erro) => {
    console.error('Erro ao carregar produtos: ', erro);
    this.carregando.set(false);
  }
});
}

  //! método para monitorar alterações em tempo real usando effect()
  constructor(){


    //! Carrega a API
    this.carregarProdutos();
    effect(()=>{
      console.log('Lista de Produtos Alterados: ', this.produtos());
    });
    effect(()=>{
      console.log('Valor Total Atualizado', this.valorTotal());
    });
    effect(()=>{
      if(typeof document !== 'undefined'){
        document.title = `(${this.totalProdutos()}) - Loja da Jolly`;
      }
    });
  }
  //metodo para calcular quantidade total de itens no carrinho
  quantidadeCarrinho = computed (() => this.carrinho().length);
  //metodo para calcular o valor total de itens no carrinho
  totalCarrinho = computed (() =>{
    return this.carrinho().reduce((total, item) =>
    total + item.preco,0)});

}
 

  
  
  




  


 