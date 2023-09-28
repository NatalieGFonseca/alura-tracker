import ITarefa from "@/interfaces/ITarefa";
import { Module } from "vuex";
import { Estado } from "@/store";
import { DEFINIR_TAREFA, ADICIONA_TAREFA, EDITA_TAREFA } from "../tipo-mutations";
import clientApi from "@/api/api";
import { OBTER_TAREFAS, CADASTRAR_TAREFAS, EDITAR_TAREFA } from "../tipo-actions";

export interface EstadoTarefa{
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa,Estado> = {
    mutations: {
        [DEFINIR_TAREFA](state, tarefas: ITarefa[]){
            state.tarefas = tarefas
         },
        [ADICIONA_TAREFA](state, novaTarefa: ITarefa){
            state.tarefas.push(novaTarefa)
        },
        [EDITA_TAREFA](state, tarefa: ITarefa){
            const index = state.tarefas.findIndex(tar => tar.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
    },
    actions: {
        [OBTER_TAREFAS]({commit}){
            clientApi.get('tarefas')
            .then( response => commit(DEFINIR_TAREFA, response.data))
        },
        [CADASTRAR_TAREFAS](contexto, tarefa : ITarefa){
            return clientApi.post('tarefas', {
                tempo: tarefa.tempo,
                descricao: tarefa.descricao,
                projeto: tarefa.projeto
            }).then( response => contexto.commit(ADICIONA_TAREFA, response.data))
        },
        [EDITAR_TAREFA]({commit}, tarefa: ITarefa){
            return clientApi.put(`tarefas/${tarefa.id}`, tarefa ).then( () => {
                commit( EDITA_TAREFA, tarefa)

            })
        },
    }
}