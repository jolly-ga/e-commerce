
import {Injectable } from "@angular/core";
import { signal } from "@angular/core";
import { computed } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CarrinhoService {

    //! Estado Global - criado com sucesso
    private carrinho = signal<{nome: string; preco: number}[]>([]);
    
    //? seleção
    itens = computed(() => this.carrinho());
    quantidadeItens = computed(() => this.carrinho().length);
    totalItens = computed(() => 
    this.carrinho().reduce((total, item) => total + item.preco, 0));
    // TODO: Ação Adicionar produtos

    adicionar(produto:{nome:string;preco:number}){
        this.carrinho.update(lista => [...lista, produto]);
    }
    //TODO: Ação de limpeza
    limpar(){
        this.carrinho.set([]);
    }
 
}