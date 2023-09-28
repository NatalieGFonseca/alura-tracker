import { tarefa } from './modules/tarefa';

/**Configura o estado de algo */

import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { NOTIFICAR } from "./tipo-mutations";
import { INotificacao } from "@/interfaces/INotificacao";
import { EstadoProjeto, projeto } from './modules/projeto';
import { EstadoTarefa } from "./modules/tarefa";

export interface Estado {
    notificacoes: INotificacao[],
    tarefa: EstadoTarefa,
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        notificacoes: [],
        tarefa: {
            tarefas: []
        },
        projeto: {
            projetos: []
        }
    },
    mutations: {
        [NOTIFICAR](state, novaNotificao: INotificacao){
            novaNotificao.id = new Date().getTime();
            state.notificacoes.push(novaNotificao)

            /*Retira da exibição */
            setTimeout( () => {
               state.notificacoes = state.notificacoes.filter( not => not.id != novaNotificao.id)
            }, 3000 )
        }
    },
    modules: {
        projeto,
        tarefa
    }
})

export function useStore(): Store<Estado>{
    return vuexUseStore(key)
}

