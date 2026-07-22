import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';//remove a importação do RouterOutlet, pois não é necessário para esse componente
//import{Produto} from './components/produto/produto'; //importando a classe produto do arquivo produto.ts para ser usado no componente app
import{ RouterOutlet, RouterLink } from '@angular/router';
import { UpperCasePipe} from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, UpperCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
  nomeLoja = 'Mercado Liso';
}
