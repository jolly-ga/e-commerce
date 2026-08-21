
import {Injectable } from "@angular/core";
import { signal } from "@angular/core";
import { computed } from "@angular/core";
import { ItemCarrinho } from "../models/item-carrinho";


@Injectable({
    providedIn: 'root'
})

export class CarrinhoService {

    //! Estado Global - criado com sucesso
    private carrinho = signal <ItemCarrinho[]>([]);
    
    //? seleção
    itens = computed(() => this.carrinho());
    quantidadeItens = computed(() => this.carrinho().length);
    totalItens = computed(() =>  this.carrinho().reduce((total, item) => total = item.preco,0));
    carrinhoVazio = computed (() => this.carrinho().length === 0);
    // TODO: Ação Adicionar produtos

    adicionar(produto:{nome: string; preco: number}){
        this.carrinho.update(lista => [...lista, produto]);
    }
    //TODO: Ação de limpeza
    limpar(){
        this.carrinho.set([]);
    }

    removerItem(rmvItem:number){
        this.carrinho.update((listaAtual) =>
        listaAtual.filter((_, index) => index !== rmvItem));
    }
 
}