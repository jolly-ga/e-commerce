import {HttpInterceptorFn} from "@angular/common/http";
import { tap } from "rxjs";
import { catchError } from "rxjs";
import { throwError } from "rxjs";
import {inject} from "@angular/core";
import { AuthFacade } from "../facades/auth.facade";
import { Router } from '@angular/router';


export const httpInterceptor: HttpInterceptorFn = (req, next) => {

    console.log('Interceptando Requisição: ', req.url);
    //!aqui voce pode adicionar logica para modificar a requisição
    const authFacade = inject(AuthFacade);
    const router = inject(Router);
    const token = authFacade.obterToken();
    const novaReq = token?
    req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    }):
    req;
return next(novaReq).pipe(
    tap({
        next: (event) => console.log ('Responde: ', event),
        error: (error) => console.error('Erro de Requisição: ', error)
    }),

    
    catchError((error) =>{
     console.error('ERRO GLOBAL: ', error);
     authFacade.sair();
     router.navigateByUrl('/login');


     if(error.status ==401){
        //aqui voce poe adicionar logica para lidar com erros
        console.warn('Usuario não autorizado!');
     }


     if (error.status == 500){
        console.warn('Erro interno do servidor!');
     }

     if(error.status === 403){
        console.warn('acesso Proibido, Usuário sem Permissão!');
        router.navigateByUrl('/produtos');
     }



     return throwError(() => error);

    }),
);

};